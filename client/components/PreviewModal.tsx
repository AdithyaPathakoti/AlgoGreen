import React from "react";
import Modal from "./Modal";
import Button from "./Button";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  data: {
    organizationName: string;
    creditAmount: number;
    certificateType: string;
    location: string;
    description: string;
    issueDate: string;
  };
  isLoading?: boolean;
}

const PreviewModal: React.FC<PreviewModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  data,
  isLoading = false,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Review NFT Details" size="md">
      <div className="space-y-4">
        <div className="p-4 rounded-lg bg-muted/50 border border-border">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-semibold text-foreground mb-1">Carbon Credit NFT</h3>
              <p className="text-xs text-muted-foreground">Review the metadata that will be embedded in the NFT.</p>
            </div>
            <div className="text-right text-sm text-muted-foreground">
              <div>{data.issueDate}</div>
              <div className="mt-1">{data.certificateType}</div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <p className="text-sm text-muted-foreground">Organization</p>
              <p className="text-base font-medium text-foreground">{data.organizationName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Amount</p>
              <p className="text-base font-medium text-foreground">{data.creditAmount} MT CO₂</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="text-base font-medium text-foreground">{data.location}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-sm text-muted-foreground">Description</p>
              <p className="text-sm text-foreground mt-1">{data.description}</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 text-blue-900 rounded-lg p-3 text-sm">
          <p className="font-medium mb-1">⚠️ Important</p>
          <p className="text-sm">
            Once minted, this NFT will be published to the Algorand blockchain and cannot be modified.
          </p>
        </div>
      </div>

      <div className="flex gap-3 pt-6 border-t border-border justify-end">
        <Button onClick={onClose} variant="ghost" disabled={isLoading}>
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="primary"
          isLoading={isLoading}
          disabled={isLoading}
        >
          Confirm & Mint NFT
        </Button>
      </div>
    </Modal>
  );
};

export default PreviewModal;
