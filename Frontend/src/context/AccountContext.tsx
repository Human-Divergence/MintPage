import React, { ReactNode, createContext, useState } from "react";

type AccountContextProps = {};

type AccountProviderProps = {
  children: ReactNode;
};

const AccountContext = createContext<AccountContextProps>({});

export function AccountProvider({ children }: AccountProviderProps) {
  const [account, setAccount] = useState(null);

  const value = {
    account,
    setAccount,
  };
  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
}
