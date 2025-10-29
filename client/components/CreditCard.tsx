import React from "react";
import Button from "./Button";

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

const CreditCard: React.FC<CreditCardProps> = ({ credit, onClick, onTrade, onVerify }) => {
  return (
    <article
      onClick={onClick}
      className={`rounded-xl border border-border bg-white shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-200 ${onClick ? "cursor-pointer" : ""}`}
      role="article"
      aria-labelledby={`credit-${credit.assetId}-title`}
      aria-label={`Credit ${credit.name}`}
      {...(onClick
        ? {
            tabIndex: 0,
            onKeyDown: (e: React.KeyboardEvent) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            },
          }
        : {})}
    >
      <header className="p-4 bg-gradient-to-r from-emerald-50 to-sky-50 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h3 id={`credit-${credit.assetId}-title`} className="font-semibold text-sm text-foreground">{credit.name}</h3>
            <p className="text-xs text-muted-foreground">{credit.organization}</p>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">{credit.issueDate}</div>
            {credit.verified ? (
              <div className="mt-1 text-xs text-green-600 font-medium">✓ Verified</div>
            ) : (
              <div className="mt-1 text-xs text-muted-foreground">Unverified</div>
            )}
          </div>
        </div>
      </header>

      <div className="p-4 space-y-4">
        <div>
          <span className="text-xs text-muted-foreground">Carbon Credits</span>
          <div className="mt-1 text-2xl font-bold text-foreground">{credit.amount} MT</div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-muted/10 p-3 rounded">
            <div className="text-xs text-muted-foreground">Asset ID</div>
            <div className="font-mono mt-1 text-sm">{credit.assetId}</div>
          </div>
          <div className="bg-muted/10 p-3 rounded">
            <div className="text-xs text-muted-foreground">Issued</div>
            <div className="mt-1 text-sm">{credit.issueDate}</div>
          </div>
        </div>

        {credit.metadata && (
          <div className="text-sm bg-muted/5 p-3 rounded">
            <div className="text-xs text-muted-foreground mb-2">Metadata</div>
            <div className="grid grid-cols-1 gap-1 text-xs">
              {Object.entries(credit.metadata).map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-muted-foreground capitalize">{k}</span>
                  <span className="text-foreground ml-2">{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {(onTrade || onVerify) && (
        <footer className="px-4 py-3 border-t bg-muted/5 flex gap-2">
          {onTrade && (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onTrade();
              }}
              className="flex-1"
              variant="primary"
              aria-label="Trade credit"
            >
              Trade
            </Button>
          )}
          {onVerify && (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onVerify();
              }}
              className="flex-1"
              variant="outline"
              aria-label="Verify credit"
            >
              Verify
            </Button>
          )}
        </footer>
      )}
    </article>
  );
};

export default CreditCard;
