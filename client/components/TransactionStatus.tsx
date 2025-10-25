import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import Button from "./Button";
import Loader from "./Loader";

type TransactionState = "pending" | "success" | "failed";

interface TransactionStatusProps {
  isOpen: boolean;
  state: TransactionState;
  txId?: string;
  assetId?: number;
  message?: string;
  onClose: () => void;
}

const TransactionStatus: React.FC<TransactionStatusProps> = ({
  isOpen,
  state,
  txId,
  assetId,
  message,
  onClose,
}) => {
  const [displayedTxId, setDisplayedTxId] = useState("");

  useEffect(() => {
    if (state === "success" && txId) {
      const timer = setTimeout(() => {
        setDisplayedTxId(txId);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [state, txId]);

  const stateConfig = {
    pending: {
      icon: "⏳",
      title: "Processing Transaction",
      description: "Your transaction is being processed on the blockchain...",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-900",
    },
    success: {
      icon: "✓",
      title: "Transaction Successful",
      description: "Your carbon credit NFT has been minted successfully!",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      textColor: "text-green-900",
    },
    failed: {
      icon: "✕",
      title: "Transaction Failed",
      description: message || "The transaction could not be completed.",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      textColor: "text-red-900",
    },
  };

  const config = stateConfig[state];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" closeButton={false}>
      {state === "pending" ? (
        <div className="text-center">
          <Loader size="lg" fullScreen={false} />
          <p className="text-foreground font-medium mt-4">{config.title}</p>
          <p className="text-muted-foreground text-sm mt-2">
            {config.description}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className={`rounded-lg p-6 border ${config.borderColor} ${config.bgColor}`}>
            <div className="text-center mb-4">
              <div className="text-5xl mb-2">{config.icon}</div>
              <h3 className={`font-semibold text-lg ${config.textColor}`}>
                {config.title}
              </h3>
            </div>
            <p className={`text-sm text-center ${config.textColor}`}>
              {config.description}
            </p>
          </div>

          {displayedTxId && (
            <div className="p-4 rounded-lg bg-muted border border-border">
              <p className="text-xs text-muted-foreground mb-1">
                Transaction ID
              </p>
              <p className="text-xs font-mono text-foreground break-all">
                {displayedTxId}
              </p>
            </div>
          )}

          {assetId && (
            <div className="p-4 rounded-lg bg-muted border border-border">
              <p className="text-xs text-muted-foreground mb-1">Asset ID</p>
              <p className="text-lg font-bold text-foreground">{assetId}</p>
            </div>
          )}

          <div className="pt-4 border-t border-border">
            {state === "success" ? (
              <div className="space-y-3">
                <Button
                  onClick={onClose}
                  variant="primary"
                  className="w-full"
                >
                  View in My Credits
                </Button>
                <Button
                  onClick={onClose}
                  variant="ghost"
                  className="w-full"
                >
                  Close
                </Button>
              </div>
            ) : (
              <Button
                onClick={onClose}
                variant={state === "failed" ? "destructive" : "primary"}
                className="w-full"
              >
                Close
              </Button>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
};

export default TransactionStatus;
