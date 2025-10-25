import React from "react";
import CreditCard, { CreditCardData } from "./CreditCard";
import EmptyState from "./EmptyState";

interface CreditGridProps {
  credits: CreditCardData[];
  isLoading?: boolean;
  onCreditClick?: (credit: CreditCardData) => void;
  onTrade?: (credit: CreditCardData) => void;
  onVerify?: (credit: CreditCardData) => void;
}

const CreditGrid: React.FC<CreditGridProps> = ({
  credits,
  isLoading = false,
  onCreditClick,
  onTrade,
  onVerify,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="h-48 bg-muted rounded-lg animate-pulse border border-border"
          />
        ))}
      </div>
    );
  }

  if (credits.length === 0) {
    return (
      <EmptyState
        icon="🎫"
        title="No Carbon Credits Yet"
        description="You haven't minted or received any carbon credit NFTs yet. Start by creating your first credit."
        action={{
          label: "Mint Your First Credit",
          onClick: () => {
            window.location.href = "/mint";
          },
        }}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {credits.map((credit) => (
        <CreditCard
          key={credit.assetId}
          credit={credit}
          onClick={() => onCreditClick?.(credit)}
          onTrade={() => onTrade?.(credit)}
          onVerify={() => onVerify?.(credit)}
        />
      ))}
    </div>
  );
};

export default CreditGrid;
