"use client";
import { ethers } from "ethers";
import { NextPage } from "next";
import Web3Modal from "web3modal";
import React, { useState } from "react";
import { createContext, useContext } from "react";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

/* -------------------------------------------------------------------------- */
/*                                  Settings                                  */
/* -------------------------------------------------------------------------- */

const providerOptions = {
  coinbasewallet: {
      package: CoinbaseWalletSDK,
      options: {
          appName: "minimalens",
          infuraId: {80001: "https://rpc-mumbai.maticvigil.com"}
      }
  }
};

/* -------------------------------------------------------------------------- */
/*                                 Interfaces                                 */
/* -------------------------------------------------------------------------- */

type ContextType = {
  account: any;
  setAccount: React.Dispatch<React.SetStateAction<any>>;
  disconnectAccount: () => void;
  web3Modal: Web3Modal | undefined;
};

/* -------------------------------------------------------------------------- */
/*                              Context Provider                              */
/* -------------------------------------------------------------------------- */

const AccountContext = createContext<ContextType>({} as ContextType);

interface Props {
  children: React.ReactNode;
}
const ContextProvider: NextPage<Props> = ({ children }) => {
  const [account, setAccount] = useState<ethers.providers.JsonRpcSigner>();

  var web3Modal: Web3Modal | undefined = undefined;
  if (typeof window !== "undefined") {
    web3Modal = new Web3Modal({
      cacheProvider: true,
      providerOptions,
    });
  }

  function disconnectAccount() {
    if (web3Modal == undefined) return;
    web3Modal.clearCachedProvider();
    setAccount(undefined);
  }

  return (
    <AccountContext.Provider value={{ account, setAccount, disconnectAccount, web3Modal }}>
      {children}
    </AccountContext.Provider>
  );
};
export default ContextProvider;

/* -------------------------------------------------------------------------- */
/*                                    Hook                                    */
/* -------------------------------------------------------------------------- */

export const useAccounts = () => useContext(AccountContext);
