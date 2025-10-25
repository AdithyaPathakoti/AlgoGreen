import React from "react";
import { useWallet } from "../context/WalletContext";

const NetworkSelector: React.FC = () => {
  const { network, setNetwork } = useWallet();

  return (
    <div className="rounded-lg border border-border bg-card text-card-foreground p-6">
      <h3 className="font-semibold text-foreground mb-4">Algorand Network</h3>

      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Select the Algorand network for your transactions
        </p>

        <div className="grid grid-cols-2 gap-4">
          {/* TestNet */}
          <button
            onClick={() => setNetwork("testnet")}
            className={`p-4 rounded-lg border-2 transition-all ${
              network === "testnet"
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary/50"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
              <p className="text-sm font-medium text-foreground">TestNet</p>
            </div>
            <p className="text-xs text-muted-foreground">For testing</p>
          </button>

          {/* MainNet */}
          <button
            onClick={() => setNetwork("mainnet")}
            className={`p-4 rounded-lg border-2 transition-all ${
              network === "mainnet"
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary/50"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2.5 h-2.5 rounded-full bg-primary" />
              <p className="text-sm font-medium text-foreground">MainNet</p>
            </div>
            <p className="text-xs text-muted-foreground">Live network</p>
          </button>
        </div>

        {/* Network Info */}
        <div className="p-4 rounded-lg bg-muted/50 border border-border">
          <p className="text-xs text-muted-foreground mb-2">Current Network</p>
          <div className="flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full ${
                network === "mainnet" ? "bg-primary" : "bg-yellow-500"
              }`}
            />
            <p className="text-sm font-semibold text-foreground capitalize">
              {network} (
              {network === "mainnet"
                ? "Production"
                : "Development / Testing"}
              )
            </p>
          </div>
        </div>

        {/* Warning */}
        {network === "testnet" && (
          <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-900 text-xs">
            <p className="font-medium mb-1">⚠️ TestNet Only</p>
            <p>
              You are on TestNet. Credits minted here are for testing only and
              have no real-world value.
            </p>
          </div>
        )}

        {network === "mainnet" && (
          <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-green-900 text-xs">
            <p className="font-medium mb-1">🌍 MainNet Active</p>
            <p>
              You are on MainNet. Real transactions will be recorded on the
              Algorand blockchain.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NetworkSelector;
