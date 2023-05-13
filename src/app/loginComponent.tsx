import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { authenticate, apolloClient, getChallenge } from "./api";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import { useAccounts } from "@/components/accountContext";

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

  return (
    <div>
      <button onClick={connectWallet}>Log in</button>
      <div>
        <button onClick={authenticateAPI}>Authentication</button>
      </div>
    </div>
  );
}
