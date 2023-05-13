"use client";
import { ethers } from "ethers";
import { toast } from 'react-toastify';
import { useCallback, useEffect, useState } from "react";
import { useAccounts } from "@/components/web3Context";
import { authenticate, apolloClient, getChallenge } from "./api";
import { LinkIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid';
import { useLensAccounts } from "@/components/lensACCOUNTContext";

/* -------------------------------------------------------------------------- */
/*                                 Components                                 */
/* -------------------------------------------------------------------------- */

export function LoginButton() {
  const [ onRender, setOnRender ] = useState(true);
  const { account, setAccount, disconnectAccount, web3Modal } = useAccounts();
  const { account: lensAccount, setLensAccount, disconnectLens } = useLensAccounts();

  const connectWallet = useCallback(async () => {
    try {
      if (web3Modal == undefined) return;
      const web3ModalInstance = await web3Modal.connect();
      const web3ModalProvider = new ethers.providers.Web3Provider(web3ModalInstance);
      const account = await web3ModalProvider.getSigner();
      setAccount(account);
    } catch (error) {
      if (error == "Modal closed by user") return;
      toast("" + error, {
        type: "error"
      });
      return;
    }
  }, [setAccount, web3Modal]);

  async function getTokens() {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
    const signerAddress = await account.getAddress();
    const response = await apolloClient.query({
      query: getChallenge,
      variables: {
        address: signerAddress,
      },
    });
    const challengeText: string = response.data.challenge.text;
    const signature: string = await account.signMessage(challengeText);
    await apolloClient.mutate({
      mutation: authenticate,
      variables: {
        signature: signature,
        address: signerAddress,
      }
    }).then((result) => {
      setLensAccount({accessToken: result.data.authenticate.accessToken, refreshToken: result.data.authenticate.refreshToken})
    });
  }

  useEffect(() => {
    if (web3Modal != undefined && web3Modal.cachedProvider && onRender) {
      setOnRender(false);
      connectWallet();
    }
  }, [connectWallet, web3Modal, onRender, setOnRender]);

  if (account != undefined) {
    return (
      <button onClick={disconnectAccount} type="button" className={(web3Modal != undefined && web3Modal.cachedProvider == "") ? "opacity-0 " : "" + "sm:inline-flex items-center justify-center py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-red-600 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"}>
        <ArrowLeftOnRectangleIcon className="mr-1 -ml-1 w-5 h-5"/>
        Disconnect Wallet
      </button>
    )
  }
  return (
    <button onClick={connectWallet} type="button" className={(web3Modal != undefined && web3Modal.cachedProvider != "") ? "opacity-0 " : "" + "sm:inline-flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"}>
      <LinkIcon className="mr-1 -ml-1 w-5 h-5"/>
      Connect Wallet
    </button>
  )
}
