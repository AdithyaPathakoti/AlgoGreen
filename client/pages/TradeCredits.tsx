import React, { useState } from "react";
import LayoutWrapper from "../components/LayoutWrapper";
import TradeForm, { TradeFormData } from "../components/TradeForm";
import ConfirmationModal from "../components/ConfirmationModal";
import TransactionStatus from "../components/TransactionStatus";
import { useToast } from "../components/ToastNotification";
import { transferNFT } from "../utils/algorand";

type TransactionState = "pending" | "success" | "failed";

const TradeCredits: React.FC = () => {
  const { addToast } = useToast();
  const [formData, setFormData] = useState<TradeFormData | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isTransactionOpen, setIsTransactionOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transactionState, setTransactionState] = useState<TransactionState>(
    "pending"
  );
  const [transactionData, setTransactionData] = useState({
    txId: "",
    message: "",
  });

  const handleFormSubmit = async (data: TradeFormData) => {
    setFormData(data);
    setIsConfirmOpen(true);
  };

  const handleConfirmTransfer = async () => {
    if (!formData) return;

    setIsConfirmOpen(false);
    setIsTransactionOpen(true);
    setIsSubmitting(true);
    setTransactionState("pending");

    try {
      const result = await transferNFT(
        formData.assetId,
        formData.recipientAddress,
        formData.amount
      );

      if (result.status === "success") {
        setTransactionState("success");
        setTransactionData({
          txId: result.txId,
          message: result.message,
        });
        addToast("Credits transferred successfully!", "success");
        setFormData(null);
      } else {
        setTransactionState("failed");
        setTransactionData({
          txId: "",
          message: result.message,
        });
        addToast("Failed to transfer credits", "error");
      }
    } catch (error) {
      console.error("Transfer error:", error);
      setTransactionState("failed");
      setTransactionData({
        txId: "",
        message: error instanceof Error ? error.message : "Unknown error",
      });
      addToast("Error during transfer", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTransactionClose = () => {
    setIsTransactionOpen(false);
    if (transactionState === "success") {
      setFormData(null);
    }
  };

  return (
    <LayoutWrapper>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Trade Credits
          </h1>
          <p className="text-muted-foreground">
            Transfer your carbon credit NFTs to other Algorand addresses
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 text-sm">
            <h4 className="font-semibold mb-1">💼 Peer-to-Peer Trading</h4>
            <p className="text-xs">
              Transfer credits directly to any Algorand wallet address
            </p>
          </div>
          <div className="p-4 rounded-lg bg-green-50 border border-green-200 text-green-900 text-sm">
            <h4 className="font-semibold mb-1">⚡ Instant Settlement</h4>
            <p className="text-xs">
              Transactions are confirmed immediately on the blockchain
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="p-6 rounded-lg border border-border bg-card text-card-foreground">
              <TradeForm
                onSubmit={handleFormSubmit}
                isLoading={isSubmitting}
                availableAmount={100}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Important Notice */}
            <div className="p-6 rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-900">
              <h3 className="font-semibold mb-3">⚠️ Important</h3>
              <ul className="text-xs space-y-2">
                <li>✓ Double-check recipient address</li>
                <li>✓ Transactions cannot be reversed</li>
                <li>✓ Ensure address exists on Algorand</li>
                <li>✓ Include optional message for recipient</li>
              </ul>
            </div>

            {/* Address Format Info */}
            <div className="p-6 rounded-lg border border-border bg-muted/50">
              <h3 className="font-semibold text-foreground mb-3">
                Address Format
              </h3>
              <p className="text-xs text-muted-foreground mb-3">
                Algorand addresses are 58 characters long:
              </p>
              <code className="block text-xs font-mono bg-background p-2 rounded border border-border text-foreground break-all">
                AAAAAAAAAAAAAAAAA...AAAAAAY5HVY
              </code>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {formData && (
        <ConfirmationModal
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={handleConfirmTransfer}
          title="Confirm Transfer"
          message={`Transfer ${formData.amount} credits to ${formData.recipientAddress.slice(0, 16)}...${formData.recipientAddress.slice(-10)}?`}
          confirmText="Transfer"
          isLoading={isSubmitting}
        />
      )}

      {/* Transaction Status Modal */}
      <TransactionStatus
        isOpen={isTransactionOpen}
        state={transactionState}
        txId={transactionData.txId}
        message={transactionData.message}
        onClose={handleTransactionClose}
      />
    </LayoutWrapper>
  );
};

export default TradeCredits;
