import { NextPage } from "next";
import React, { useState } from "react";
import { createContext, useContext } from "react";

type ContextType = {
  account: any;
  setAccount: React.Dispatch<React.SetStateAction<any>>;
};

const AccountContext = createContext<ContextType>({} as ContextType);

interface Props {
  children: React.ReactNode;
}

const ContextProvider: NextPage<Props> = ({ children }) => {
  const [account, setAccount] = useState<any>();

  return (
    <AccountContext.Provider value={{ account, setAccount }}>
      {children}
    </AccountContext.Provider>
  );
};

export default ContextProvider;

export const useAccounts = () => useContext(AccountContext);