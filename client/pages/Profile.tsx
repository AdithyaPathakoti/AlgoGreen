import React, { useState, useEffect } from "react";
// LayoutWrapper provided by App.tsx
import WalletInfo from "../components/WalletInfo";
import TransactionHistory, { Transaction } from "../components/TransactionHistory";
import Button from "../components/Button";
import { useWallet } from "../context/WalletContext";
import { getTransactionHistory } from "../utils/algorand";
import { useToast } from "../components/ToastNotification";

const Profile: React.FC = () => {
  const { isConnected, address, balance, disconnectWallet } = useWallet();
  const { addToast } = useToast();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoadingTx, setIsLoadingTx] = useState(false);

  useEffect(() => {
    const loadTransactions = async () => {
      if (!isConnected || !address) return;

      setIsLoadingTx(true);
      try {
        const history = await getTransactionHistory(address);
        setTransactions(history);
      } catch (error) {
        console.error("Failed to load transactions:", error);
      } finally {
        setIsLoadingTx(false);
      }
    };

    loadTransactions();
  }, [isConnected, address]);

  const handleCopyAddress = (text: string) => {
    addToast("Address copied to clipboard", "success");
  };

  const handleDisconnect = () => {
    disconnectWallet();
    addToast("Wallet disconnected", "info");
  };

  return (
    <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Profile</h1>
          <p className="text-muted-foreground">
            View your wallet information and transaction history
          </p>
        </div>

        {!isConnected ? (
          <div className="p-6 rounded-lg bg-blue-50 border border-blue-200 text-blue-900">
            <h3 className="font-semibold mb-2">🔗 Connect Your Wallet</h3>
            <p className="text-sm">
              Connect your Algorand wallet to view your profile and transaction history.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <WalletInfo
                address={address}
                balance={balance}
                network="testnet"
                onDisconnect={handleDisconnect}
                onCopy={handleCopyAddress}
              />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profile Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border border-border bg-card text-card-foreground">
                  <p className="text-xs text-muted-foreground mb-1">
                    Total Balance
                  </p>
                  <p className="text-2xl font-bold text-primary">{balance}</p>
                  <p className="text-xs text-muted-foreground mt-1">ALGO</p>
                </div>
                <div className="p-4 rounded-lg border border-border bg-card text-card-foreground">
                  <p className="text-xs text-muted-foreground mb-1">
                    Network Status
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <p className="text-sm font-semibold text-foreground">
                      TestNet
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="p-6 rounded-lg border border-border bg-card text-card-foreground">
                <h3 className="font-semibold text-foreground mb-4">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a href="/dashboard">
                    <Button variant="secondary" className="w-full">
                      Dashboard
                    </Button>
                  </a>
                  <a href="/credits">
                    <Button variant="secondary" className="w-full">
                      My Credits
                    </Button>
                  </a>
                  <a href="/mint">
                    <Button variant="secondary" className="w-full">
                      Mint Credits
                    </Button>
                  </a>
                  <a href="/settings">
                    <Button variant="secondary" className="w-full">
                      Settings
                    </Button>
                  </a>
                </div>
              </div>

              {/* Export/Import (Placeholder) */}
              <div className="p-6 rounded-lg border border-border bg-card text-card-foreground">
                <h3 className="font-semibold text-foreground mb-4">
                  Data Management
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Export your transaction data for record keeping
                </p>
                <Button variant="ghost">
                  Export Transaction History
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Transaction History */}
        {isConnected && (
          <TransactionHistory
            transactions={transactions}
            isLoading={isLoadingTx}
          />
        )}
      </div>
  );
};

export default Profile;
