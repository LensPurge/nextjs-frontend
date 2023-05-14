"use client";
import { ethers } from "ethers";
import { NextPage } from "next";
import Web3Modal from "web3modal";
import React, { useState } from "react";
import { createContext, useContext } from "react";

/* -------------------------------------------------------------------------- */
/*                                 Interfaces                                 */
/* -------------------------------------------------------------------------- */

type ContextType = {
  provider: ethers.providers.Web3Provider | undefined;
  setProvider: React.Dispatch<ethers.providers.Web3Provider | undefined>;
  disconnectAccount: () => void;
  signedIn: boolean;
};

/* -------------------------------------------------------------------------- */
/*                              Context Provider                              */
/* -------------------------------------------------------------------------- */

const AccountContext = createContext<ContextType>({} as ContextType);

interface Props {
  children: React.ReactNode;
}
const ContextProvider: NextPage<Props> = ({ children }) => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | undefined>(undefined);

  var web3Modal: Web3Modal | undefined = undefined;
  if (typeof window !== "undefined") {
    web3Modal = new Web3Modal({
      cacheProvider: true
    });
  }

  function disconnectAccount() {
    if (web3Modal == undefined) return;
    web3Modal.clearCachedProvider();
    setProvider(undefined);
  }

  const signedIn = provider != undefined;
  return (
    <AccountContext.Provider value={{ provider, setProvider, disconnectAccount, signedIn }}>
      {children}
    </AccountContext.Provider>
  );
};
export default ContextProvider;

/* -------------------------------------------------------------------------- */
/*                                    Hook                                    */
/* -------------------------------------------------------------------------- */

export const useAccounts = () => useContext(AccountContext);
