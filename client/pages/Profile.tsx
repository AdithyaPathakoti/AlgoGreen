import React, { useState, useEffect } from "react";
// LayoutWrapper provided by App.tsx
import { Link } from "react-router-dom";
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

  const handleCopyAddress = async (text: string) => {
    try {
      if (navigator.clipboard && text) {
        await navigator.clipboard.writeText(text);
      }
      addToast("Address copied to clipboard", "success");
    } catch (err) {
      console.warn("Clipboard not available", err);
      addToast("Could not copy address", "error");
    }
  };

  const handleDisconnect = () => {
    disconnectWallet();
    addToast("Wallet disconnected", "info");
  };

  return (
    <main role="main" className="space-y-8">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-1">Profile</h1>
          <p className="text-muted-foreground">View your wallet information and transaction history</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => window.location.href = '/settings'}>Settings</Button>
          <Button variant="primary" size="sm" onClick={() => window.location.href = '/mint'}>Mint</Button>
        </div>
      </div>

      {!isConnected ? (
        <div className="p-6 rounded-lg bg-blue-50 border border-blue-200 text-blue-900">
          <h3 className="font-semibold mb-2">🔗 Connect Your Wallet</h3>
          <p className="text-sm">Connect your Algorand wallet to view your profile and transaction history.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <WalletInfo address={address} balance={balance} network="testnet" onDisconnect={handleDisconnect} onCopy={() => handleCopyAddress(address || '')} />
            <div className="mt-4 space-y-3">
              <Button variant="outline" className="w-full" onClick={() => window.location.href = '/credits'}>View My Credits</Button>
              <Button variant="ghost" className="w-full" onClick={() => window.location.href = '/transactions'}>Export Transactions</Button>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-border bg-card text-card-foreground">
                <p className="text-xs text-muted-foreground mb-1">Total Balance</p>
                <p className="text-2xl font-bold text-primary">{balance}</p>
                <p className="text-xs text-muted-foreground mt-1">ALGO</p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card text-card-foreground">
                <p className="text-xs text-muted-foreground mb-1">Network Status</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <p className="text-sm font-semibold text-foreground">TestNet</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-lg border border-border bg-card text-card-foreground">
              <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link to="/dashboard"><Button variant="secondary" className="w-full">Dashboard</Button></Link>
                <Link to="/credits"><Button variant="secondary" className="w-full">My Credits</Button></Link>
                <Link to="/mint"><Button variant="secondary" className="w-full">Mint Credits</Button></Link>
                <Link to="/settings"><Button variant="secondary" className="w-full">Settings</Button></Link>
              </div>
            </div>

            <div className="p-6 rounded-lg border border-border bg-card text-card-foreground">
              <h3 className="font-semibold text-foreground mb-4">Data Management</h3>
              <p className="text-sm text-muted-foreground mb-4">Export your transaction data for record keeping</p>
              <Button variant="ghost">Export Transaction History</Button>
            </div>
          </div>
        </div>
      )}

      {isConnected && (
        <TransactionHistory transactions={transactions} isLoading={isLoadingTx} />
      )}
    </main>
  );
};

export default Profile;
