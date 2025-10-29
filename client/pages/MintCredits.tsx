import React, { useState } from "react";
// LayoutWrapper is provided by App.tsx; pages should render content only.
import MintForm, { MintFormData } from "../components/MintForm";
import FileUploader from "../components/FileUploader";
import PreviewModal from "../components/PreviewModal";
import TransactionStatus from "../components/TransactionStatus";
import { useToast } from "../components/ToastNotification";
import { mintNFT } from "../utils/algorand";
import { useWallet } from "../context/WalletContext";
import { uploadToIPFS, uploadMetadataToIPFS } from "../utils/ipfs";

type TransactionState = "pending" | "success" | "failed";

const MintCredits: React.FC = () => {
  const { addToast } = useToast();
  const { address } = useWallet();
  const [certificateFile, setCertificateFile] = useState<File | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [formData, setFormData] = useState<MintFormData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transactionState, setTransactionState] = useState<TransactionState>(
    "pending"
  );
  const [transactionData, setTransactionData] = useState({
    txId: "",
    assetId: 0,
    message: "",
  });
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);

  const handleFormSubmit = async (data: MintFormData) => {
    setFormData(data);
    setIsPreviewOpen(true);
  };

  const handleConfirmMint = async () => {
    if (!formData) return;

    setIsSubmitting(true);
    setIsPreviewOpen(false);
    setTransactionState("pending");
    setIsTransactionModalOpen(true);

    try {
      if (!address) {
        setIsSubmitting(false);
        addToast("Connect your wallet to mint credits", "error");
        setTransactionState("failed");
        setTransactionData({ txId: "", assetId: 0, message: "Wallet not connected" });
        return;
      }
      let certificateHash = "";

      // Upload certificate if provided
      if (certificateFile) {
        try {
          const result = await uploadToIPFS(certificateFile);
          certificateHash = result.hash;
          addToast("Certificate uploaded to IPFS", "success");
        } catch (error) {
          console.error("Certificate upload failed:", error);
          addToast("Failed to upload certificate", "error");
        }
      }

      // Create NFT metadata
      const metadata = {
        name: formData.organizationName,
        description: formData.description,
        amount: formData.creditAmount,
        certificateType: formData.certificateType,
        issueDate: formData.issueDate,
        location: formData.location,
        certificateHash,
        createdAt: new Date().toISOString(),
      };

      // Upload metadata to IPFS
      const metadataResult = await uploadMetadataToIPFS(metadata);

      // Mint NFT
      const result = await mintNFT(
        address,
        formData.organizationName,
        formData.creditAmount,
        formData.description,
        metadataResult.hash
      );

      if (result.status === "success") {
        setTransactionData({
          txId: result.txId,
          assetId: result.assetId || 0,
          message: result.message,
        });
        setTransactionState("success");
        addToast("Carbon credit NFT minted successfully!", "success");

        // Reset form
        setFormData(null);
        setCertificateFile(null);
      } else {
        setTransactionState("failed");
        setTransactionData({
          txId: "",
          assetId: 0,
          message: result.message,
        });
        addToast("Failed to mint NFT", "error");
      }
    } catch (error) {
      console.error("Minting error:", error);
      setTransactionState("failed");
      setTransactionData({
        txId: "",
        assetId: 0,
        message: error instanceof Error ? error.message : "Unknown error",
      });
      addToast("Error during minting process", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTransactionModalClose = () => {
    setIsTransactionModalOpen(false);
    if (transactionState === "success") {
      // Reset form on success
      setFormData(null);
      setCertificateFile(null);
    }
  };

  return (
    <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Mint Carbon Credits
          </h1>
          <p className="text-muted-foreground">
            Create new carbon credit NFTs backed by verified sustainability
            projects.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 text-sm">
            <h4 className="font-semibold mb-1">📋 Required Information</h4>
            <p className="text-xs">Organization name, credit amount, and certification type</p>
          </div>
          <div className="p-4 rounded-lg bg-green-50 border border-green-200 text-green-900 text-sm">
            <h4 className="font-semibold mb-1">🔐 Blockchain Backed</h4>
            <p className="text-xs">
              All credits are minted as NFTs on Algorand blockchain
            </p>
          </div>
          <div className="p-4 rounded-lg bg-purple-50 border border-purple-200 text-purple-900 text-sm">
            <h4 className="font-semibold mb-1">☁️ IPFS Storage</h4>
            <p className="text-xs">
              Certificates and metadata stored on decentralized IPFS
            </p>
          </div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="p-6 rounded-lg border border-border bg-card text-card-foreground">
              <MintForm
                onSubmit={handleFormSubmit}
                isLoading={isSubmitting}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* File Upload */}
            <div className="p-6 rounded-lg border border-border bg-card text-card-foreground">
              <h3 className="font-semibold text-foreground mb-4">
                Upload Certificate
              </h3>
              <FileUploader
                onFileSelect={(file) => setCertificateFile(file)}
                accept=".pdf,.png,.jpg,.jpeg"
                maxSize={10485760}
                label="Certificate File (Optional)"
                helperText="Upload your sustainability certificate"
              />
              {certificateFile && (
                <div className="mt-4 p-3 rounded-lg bg-green-50 border border-green-200 text-green-900 text-sm">
                  <p className="font-medium">✓ File selected</p>
                  <p className="text-xs mt-1">{certificateFile.name}</p>
                </div>
              )}
            </div>

            {/* Live Preview Summary */}
            {formData && (
              <div className="p-4 rounded-lg border border-border bg-white text-foreground">
                <h4 className="font-semibold mb-2">Preview Summary</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>
                    <span className="font-medium">Org:</span> {formData.organizationName || "—"}
                  </p>
                  <p>
                    <span className="font-medium">Amount:</span> {formData.creditAmount} MT
                  </p>
                  <p>
                    <span className="font-medium">Type:</span> {formData.certificateType}
                  </p>
                  <p>
                    <span className="font-medium">Issue Date:</span> {formData.issueDate}
                  </p>
                </div>
                <div className="mt-3">
                  <button
                    onClick={() => setIsPreviewOpen(true)}
                    className="text-sm text-primary underline"
                  >
                    Open full preview
                  </button>
                </div>
              </div>
            )}

            {/* Guidelines */}
            <div className="p-6 rounded-lg border border-border bg-muted/50">
              <h3 className="font-semibold text-foreground mb-3">Guidelines</h3>
              <ul className="text-xs text-muted-foreground space-y-2">
                <li>✓ Provide accurate organization information</li>
                <li>✓ Credit amounts should reflect verified offsets</li>
                <li>✓ Include relevant certification details</li>
                <li>✓ Add project location for transparency</li>
                <li>✓ Optional: Upload supporting documentation</li>
              </ul>
            </div>
          </div>
        </div>

      {/* Preview Modal */}
      {formData && (
        <PreviewModal
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          onConfirm={handleConfirmMint}
          data={formData}
          isLoading={isSubmitting}
        />
      )}

      {/* Transaction Status Modal */}
      <TransactionStatus
        isOpen={isTransactionModalOpen}
        state={transactionState}
        txId={transactionData.txId}
        assetId={transactionData.assetId}
        message={transactionData.message}
        onClose={handleTransactionModalClose}
      />
    </div>
  );
};

export default MintCredits;
