import Web3Modal from "web3modal";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import { ethers, utils } from "ethers";
import { authenticate, apolloClient, getChallenge,
         unfollowUser, getUnfollowTypedData } from "./api";
import { useAccounts } from "@/components/accountContext";
import { getClient } from "./client";
import { LENS_FOLLOW_NFT_ABI } from "./abi";
import { omit } from "./helper";
import { TypedDataDomain } from '@ethersproject/abstract-signer';

export function LoginButton() {
  const { account, setAccount } = useAccounts();

  const providerOptions = {
    coinbasewallet: {
        package: CoinbaseWalletSDK,
        options: {
            appName: "minimalens",
            infuraId: {80001: "https://rpc-mumbai.maticvigil.com"}
        }
    }
  };

   async function signedTypeData(
    domain: TypedDataDomain,
    types: Record<string, any>,
    value: Record<string, any>
  ) {
    return account._signTypedData(
      omit(domain, '__typename'),
      omit(types, '__typename'),
      omit(value, '__typename')
    );
  };

  async function connectWallet() {
    try {
      let web3Modal = new Web3Modal({
        cacheProvider: false,
        providerOptions,
      });
      const web3ModalInstance = await web3Modal.connect();
      const web3ModalProvider = new ethers.providers.Web3Provider(
        web3ModalInstance
      );
      let account = web3ModalProvider.getSigner();
      setAccount(account);
    } catch (error) {
      console.log("error while connecting with wallet: ", error);
    }
  }

  async function authenticateAPI() {
    const signerAddress = await account.getAddress()

    let response = await apolloClient.query({
      query: getChallenge,
      variables: {
        address: signerAddress,
      },
    });
    const challengeText: string = response.data.challenge.text;
    const signature: string = await account.signMessage(challengeText);
    await apolloClient
      .mutate({
        mutation: authenticate,
        variables: {
          signature: signature,
          address: signerAddress,
        },
      })
      .then((result) => {
        if (typeof localStorage !== "undefined") {
          localStorage.setItem(
            "accessToken",
            result.data.authenticate.accessToken
          ),
            localStorage.setItem(
              "refreshToken",
              result.data.authenticate.refreshToken
            );
        } else {
          console.log("localStorage is not defined");
        }
      });
  }

  async function createUnfollowTypedData (profileId:string) {
    const result = await apolloClient.mutate({
        mutation: getUnfollowTypedData,
        variables: {
            profile: profileId
        }
    })
    return result.data!.createUnfollowTypedData
  }

  async function unfollow() {
    // @note this also needs to be variable, bc this is the followed NFT address
    const followNftAddress = "0x519B98aCFe0d13161aE75E6aEA8C4C60f6418055"
    const followNftContract = new ethers.Contract(
        followNftAddress,
        LENS_FOLLOW_NFT_ABI,
        account
    )
    let profileId = "0x15" // @note this needs to be variable
    const result = await createUnfollowTypedData(profileId)
    const typedData = result.typedData
    const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value)
    const { v, r, s } = utils.splitSignature(signature)
    const sig = {
        v,
        r,
        s,
        deadline: typedData.value.deadline
    }
    const tx = await followNftContract.burnWithSig(typedData.value.tokenId, sig)
    console.log("follow: tx hash", tx.hash)
    const newClient = await getClient();
    await newClient.mutate({
      mutation: unfollowUser,
      variables: {
        profile: "0x15",
      },
    }).then(() =>
    console.log("successfully unfollowed"));
  }

  return (
    <div>
      <button onClick={connectWallet}>Log in</button>
      <div>
        <button onClick={authenticateAPI}>Authentication</button>
        <div>
          <button onClick={unfollow}>Unfollow</button>
        </div>
      </div>
    </div>
  );
}
