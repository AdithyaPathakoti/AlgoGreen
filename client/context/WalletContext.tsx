import React, { createContext, useContext, useState } from "react";

export type WalletContextType = {
  isConnected: boolean;
  address: string | null;
  balance: number;
  network: "testnet" | "mainnet";
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  setNetwork: (network: "testnet" | "mainnet") => void;
  updateBalance: (balance: number) => void;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState(0);
  const [network, setNetworkState] = useState<"testnet" | "mainnet">("testnet");

  const connectWallet = async () => {
    try {
      const mockAddress =
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HVY";
      setAddress(mockAddress);
      setIsConnected(true);
      setBalance(1000);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      throw error;
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAddress(null);
    setBalance(0);
  };

  const setNetwork = (newNetwork: "testnet" | "mainnet") => {
    setNetworkState(newNetwork);
  };

  const updateBalance = (newBalance: number) => {
    setBalance(newBalance);
  };

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        address,
        balance,
        network,
        connectWallet,
        disconnectWallet,
        setNetwork,
        updateBalance,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
