import React from "react";
import { formatDate } from "../utils/helpers";
import EmptyState from "./EmptyState";

export interface Transaction {
  id: string;
  type: "mint" | "transfer" | "receive";
  amount: number;
  date: string | Date;
  assetId: number;
  counterparty: string;
  status: "confirmed" | "pending";
}

interface TransactionHistoryProps {
  transactions: Transaction[];
  isLoading?: boolean;
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({
  transactions,
  isLoading = false,
}) => {
  const getTypeIcon = (type: Transaction["type"]): string => {
    const icons = {
      mint: "🔨",
      transfer: "📤",
      receive: "📥",
    };
    return icons[type];
  };

  const getTypeLabel = (type: Transaction["type"]): string => {
    const labels = {
      mint: "Minted",
      transfer: "Transferred",
      receive: "Received",
    };
    return labels[type];
  };

  const getTypeColor = (type: Transaction["type"]): string => {
    const colors = {
      mint: "text-primary",
      transfer: "text-orange-600",
      receive: "text-green-600",
    };
    return colors[type];
  };

  if (isLoading) {
    return (
      <div className="rounded-lg border border-border bg-card text-card-foreground p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Transaction History
        </h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-16 bg-muted rounded-lg animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card text-card-foreground">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Transaction History
          </h3>
          <EmptyState
            icon="📋"
            title="No Transactions Yet"
            description="Your transaction history will appear here once you start minting and trading carbon credits."
          />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card text-card-foreground overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">
          Transaction History
        </h3>
      </div>

      <div className="divide-y divide-border">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="p-4 flex items-start justify-between gap-4 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div className="text-xl flex-shrink-0">
                {getTypeIcon(tx.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className={`text-sm font-semibold ${getTypeColor(tx.type)}`}>
                    {getTypeLabel(tx.type)}
                  </p>
                  <span className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground capitalize">
                    {tx.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground break-all">
                  {tx.counterparty.slice(0, 20)}...
                  {tx.counterparty.slice(-10)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Asset ID: {tx.assetId}
                </p>
              </div>
            </div>

            <div className="text-right flex-shrink-0">
              <p className="text-sm font-semibold text-foreground">
                {tx.type === "receive" ? "+" : "-"}{tx.amount}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {typeof tx.date === "string"
                  ? tx.date
                  : formatDate(tx.date)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;
