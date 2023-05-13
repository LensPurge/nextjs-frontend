"use client";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import { useAccounts } from "@/components/accountContext";
import { authenticate, apolloClient, getChallenge } from "./api";
import { useCallback, useEffect } from "react";

const providerOptions = {
  coinbasewallet: {
      package: CoinbaseWalletSDK,
      options: {
          appName: "minimalens",
          infuraId: {80001: "https://rpc-mumbai.maticvigil.com"}
      }
  }
};
const web3Modal = new Web3Modal({
  cacheProvider: true,
  providerOptions,
});

export function LoginButton() {
  const { account, setAccount } = useAccounts();

  const connectWallet = useCallback(async () => {
    try {
      console.log(!web3Modal.cachedProvider);
      const web3ModalInstance = await web3Modal.connect();
      const web3ModalProvider = new ethers.providers.Web3Provider(
        web3ModalInstance
      );
      let account = web3ModalProvider.getSigner();
      setAccount(account);
    } catch (error) {
      console.log("error while connecting with wallet: ", error);
    }
  }, [setAccount]);

  async function authenticateAPI() {
    connectWallet();
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

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectWallet();
    }
  }, [connectWallet]);

  return (
    <>
    <button onClick={connectWallet} type="button" className="hidden sm:inline-flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-4 py-2 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
      <svg aria-hidden="true" className="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"/>
      </svg>
      Connect Wallet
    </button>
    <div>
      <button onClick={authenticateAPI}>Authentication</button>
    </div>
    </>
  );
}
