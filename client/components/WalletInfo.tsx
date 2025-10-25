import React from "react";
import Button from "./Button";
import { formatAddress, formatCurrency } from "../utils/helpers";

interface WalletInfoProps {
  address: string | null;
  balance: number;
  network: "testnet" | "mainnet";
  onDisconnect: () => void;
  onCopy?: (text: string) => void;
}

const WalletInfo: React.FC<WalletInfoProps> = ({
  address,
  balance,
  network,
  onDisconnect,
  onCopy,
}) => {
  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      onCopy?.(address);
    }
  };

  if (!address) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-muted/50 p-6 text-center">
        <svg
          className="w-12 h-12 mx-auto mb-4 text-muted-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.658 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
        <h3 className="font-semibold text-foreground mb-2">Wallet Not Connected</h3>
        <p className="text-muted-foreground text-sm mb-4">
          Connect your wallet to view balance and transaction history
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card text-card-foreground overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
        <h3 className="font-semibold text-foreground mb-4">Connected Wallet</h3>

        {/* Address */}
        <div className="space-y-3">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Wallet Address</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 text-sm font-mono bg-background px-3 py-2 rounded border border-border break-all">
                {address}
              </code>
              <button
                onClick={handleCopyAddress}
                className="p-2 hover:bg-accent/10 rounded transition-colors text-foreground"
                title="Copy address"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Short Address */}
          <div>
            <p className="text-xs text-muted-foreground mb-1">Short Address</p>
            <p className="text-sm font-mono bg-background px-3 py-2 rounded border border-border">
              {formatAddress(address)}
            </p>
          </div>
        </div>
      </div>

      {/* Balance and Network */}
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <p className="text-xs text-muted-foreground mb-1">Balance</p>
            <p className="text-2xl font-bold text-primary">
              {formatCurrency(balance)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">ALGO</p>
          </div>
          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <p className="text-xs text-muted-foreground mb-1">Network</p>
            <div className="flex items-center gap-2 mt-1">
              <div
                className={`w-3 h-3 rounded-full ${
                  network === "mainnet"
                    ? "bg-primary"
                    : "bg-yellow-500"
                }`}
              />
              <p className="text-sm font-semibold text-foreground capitalize">
                {network}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-6 border-t border-border space-y-3">
        <a
          href={`https://algoexplorer.io/address/${address}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full px-4 py-2 text-center text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
        >
          View on AlgoExplorer →
        </a>
        <Button
          onClick={onDisconnect}
          variant="ghost"
          className="w-full"
        >
          Disconnect Wallet
        </Button>
      </div>
    </div>
  );
};

export default WalletInfo;
