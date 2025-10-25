import React from "react";

export interface CreditCardData {
  assetId: number;
  name: string;
  amount: number;
  organization: string;
  issueDate: string;
  verified: boolean;
  metadata?: Record<string, string>;
  ipfsHash?: string;
}

interface CreditCardProps {
  credit: CreditCardData;
  onClick?: () => void;
  onTrade?: () => void;
  onVerify?: () => void;
}

const CreditCard: React.FC<CreditCardProps> = ({
  credit,
  onClick,
  onTrade,
  onVerify,
}) => {
  return (
    <div
      onClick={onClick}
      className={`rounded-lg border border-border bg-card text-card-foreground overflow-hidden hover:shadow-lg transition-all duration-200 ${
        onClick ? "cursor-pointer hover:border-primary/50" : ""
      }`}
    >
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-foreground text-sm">{credit.name}</h3>
          {credit.verified && (
            <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
              ✓ Verified
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground">{credit.organization}</p>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Carbon Credits</p>
          <p className="text-2xl font-bold text-primary">{credit.amount} MT</p>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-xs text-muted-foreground">Asset ID</p>
            <p className="font-mono text-xs text-foreground">
              {credit.assetId}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Issued</p>
            <p className="text-xs text-foreground">{credit.issueDate}</p>
          </div>
        </div>

        {credit.metadata && Object.keys(credit.metadata).length > 0 && (
          <div className="p-2 rounded bg-muted/50 text-xs space-y-1">
            {Object.entries(credit.metadata).slice(0, 2).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="text-muted-foreground capitalize">{key}:</span>
                <span className="text-foreground font-medium">{value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      {(onTrade || onVerify) && (
        <div className="px-4 py-3 border-t border-border flex gap-2">
          {onTrade && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onTrade();
              }}
              className="flex-1 px-3 py-1.5 text-xs font-medium text-primary bg-primary/10 rounded hover:bg-primary/20 transition-colors"
            >
              Trade
            </button>
          )}
          {onVerify && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onVerify();
              }}
              className="flex-1 px-3 py-1.5 text-xs font-medium text-primary bg-primary/10 rounded hover:bg-primary/20 transition-colors"
            >
              Verify
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CreditCard;
