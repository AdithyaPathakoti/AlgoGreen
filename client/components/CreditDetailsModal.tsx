import React from "react";
import Modal from "./Modal";
import Button from "./Button";
import { CreditCardData } from "./CreditCard";

interface CreditDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  credit: CreditCardData | null;
  onTrade?: () => void;
  onVerify?: () => void;
}

const CreditDetailsModal: React.FC<CreditDetailsModalProps> = ({
  isOpen,
  onClose,
  credit,
  onTrade,
  onVerify,
}) => {
  if (!credit) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Credit Details" size="lg">
      <div className="space-y-6">
        {/* Header Info */}
        <div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-border">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xl font-bold text-foreground">
                {credit.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {credit.organization}
              </p>
            </div>
            {credit.verified && (
              <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                ✓ Verified
              </span>
            )}
          </div>
          <div className="text-3xl font-bold text-primary">
            {credit.amount} <span className="text-lg text-muted-foreground">MT CO₂</span>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-lg bg-muted border border-border">
            <p className="text-xs text-muted-foreground mb-1">Asset ID</p>
            <p className="font-mono font-bold text-foreground text-sm">
              {credit.assetId}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-muted border border-border">
            <p className="text-xs text-muted-foreground mb-1">Issue Date</p>
            <p className="font-semibold text-foreground">{credit.issueDate}</p>
          </div>
        </div>

        {/* Metadata */}
        {credit.metadata && Object.keys(credit.metadata).length > 0 && (
          <div>
            <h4 className="font-semibold text-foreground mb-3">Additional Info</h4>
            <div className="space-y-2">
              {Object.entries(credit.metadata).map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between items-center p-3 rounded-lg bg-muted/50 border border-border"
                >
                  <span className="text-sm text-muted-foreground capitalize">
                    {key.replace(/_/g, " ")}
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* IPFS Link */}
        {credit.ipfsHash && (
          <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
            <p className="text-xs text-blue-600 font-medium mb-1">IPFS Hash</p>
            <p className="text-xs font-mono text-blue-900 break-all">
              {credit.ipfsHash}
            </p>
            <a
              href={`https://ipfs.io/ipfs/${credit.ipfsHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:underline mt-2 block"
            >
              View on IPFS Gateway →
            </a>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-border">
          <Button onClick={onClose} variant="ghost">
            Close
          </Button>
          {onTrade && (
            <Button onClick={onTrade} variant="primary">
              Trade This Credit
            </Button>
          )}
          {onVerify && (
            <Button onClick={onVerify} variant="secondary">
              Verify Authenticity
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default CreditDetailsModal;
