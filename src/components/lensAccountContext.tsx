"use client";
import { ethers } from "ethers";
import { NextPage } from "next";
import { toast } from 'react-toastify';
import { createContext, useContext } from "react";
import React, { useEffect, useState } from "react";

/* -------------------------------------------------------------------------- */
/*                                 Interfaces                                 */
/* -------------------------------------------------------------------------- */

interface ILensAccount {
  accessToken: string;
  refreshToken: string;
}

type ContextType = {
  account: any;
  setLensAccount: React.Dispatch<React.SetStateAction<ILensAccount | undefined>>;
  disconnectLens: () => void;
};

/* -------------------------------------------------------------------------- */
/*                              Context Provider                              */
/* -------------------------------------------------------------------------- */

const LensAccountAccountContext = createContext<ContextType>({} as ContextType);

interface Props {
  children: React.ReactNode;
}
const LensAccountContextProvider: NextPage<Props> = ({ children }) => {
  const [account, setLensAccount] = useState<ILensAccount | undefined>(undefined);

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      if (accessToken && refreshToken) {
        setLensAccount({
          accessToken: accessToken,
          refreshToken: refreshToken,
        });
      } else {
        setLensAccount(undefined);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    } else {
      toast("An unexpected error occured!", {
        type: "error"
      });
    }
  }, []);

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      if (account && account.accessToken !== accessToken && account.refreshToken !== refreshToken) {
        localStorage.setItem("accessToken", account.accessToken);
        localStorage.setItem("refreshToken", account.refreshToken);
      }
    } else {
      toast("An unexpected error occured!", {
        type: "error"
      });
    }
  }, [account]);

  function disconnectLens() {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    } else {
      toast("An unexpected error occured!", {
        type: "error"
      });
    }
    setLensAccount(undefined);
  }

  return (
    <LensAccountAccountContext.Provider value={{ account, setLensAccount, disconnectLens }}>
      {children}
    </LensAccountAccountContext.Provider>
  );
};
export default LensAccountContextProvider;

/* -------------------------------------------------------------------------- */
/*                                    Hook                                    */
/* -------------------------------------------------------------------------- */

export const useLensAccounts = () => useContext(LensAccountAccountContext);
