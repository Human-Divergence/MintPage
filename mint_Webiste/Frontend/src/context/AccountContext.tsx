import { createContext, useContext, useState } from 'react';

const AccountContext = createContext();

export function useAccount() {
  return useContext(AccountContext);
}

export function AccountProvider({ children }) {
  const [account, setAccount] = useState(null);

  const value = {
    account,
    setAccount,
  };
  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
}