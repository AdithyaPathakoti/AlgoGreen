import React, { useState } from "react";
// LayoutWrapper provided by App.tsx
import VerifyForm, { VerifyFormData } from "../components/VerifyForm";
import VerificationResult from "../components/VerificationResult";
import Loader from "../components/Loader";
import { useToast } from "../components/ToastNotification";
import { verifyNFT } from "../utils/algorand";

const VerifyCredits: React.FC = () => {
  const { addToast } = useToast();
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationData, setVerificationData] = useState<{
    verified: boolean;
    metadata: Record<string, string>;
    creator: string;
    creationDate: string;
  } | null>(null);
  const [currentAssetId, setCurrentAssetId] = useState("");

  const handleVerify = async (data: VerifyFormData) => {
    setIsVerifying(true);
    setCurrentAssetId(data.assetId);

    try {
      const result = await verifyNFT(parseInt(data.assetId));
      setVerificationData(result);
      addToast(
        result.verified
          ? "NFT verification successful"
          : "NFT verification failed",
        result.verified ? "success" : "error"
      );
    } catch (error) {
      console.error("Verification error:", error);
      addToast("Error during verification", "error");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleReset = () => {
    setVerificationData(null);
    setCurrentAssetId("");
  };

  return (
    <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Verify Credits
          </h1>
          <p className="text-muted-foreground">
            Verify the authenticity of carbon credit NFTs on the Algorand
            blockchain
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 text-sm">
            <h4 className="font-semibold mb-1">✓ Blockchain Verified</h4>
            <p className="text-xs">
              Check if an NFT is authentic and registered on Algorand
            </p>
          </div>
          <div className="p-4 rounded-lg bg-green-50 border border-green-200 text-green-900 text-sm">
            <h4 className="font-semibold mb-1">📦 Metadata Verified</h4>
            <p className="text-xs">
              View complete metadata stored on IPFS for transparency
            </p>
          </div>
        </div>

        {isVerifying ? (
          <Loader size="lg" message="Verifying NFT..." fullScreen={false} />
        ) : verificationData ? (
          <VerificationResult
            data={verificationData}
            assetId={currentAssetId}
            onReset={handleReset}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <div className="p-6 rounded-lg border border-border bg-card text-card-foreground">
                <VerifyForm onSubmit={handleVerify} isLoading={isVerifying} />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* FAQ */}
              <div className="p-6 rounded-lg border border-border bg-muted/50">
                <h3 className="font-semibold text-foreground mb-4">
                  Verification Process
                </h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-medium text-foreground mb-1">
                      1. Enter Asset ID
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Paste the Algorand asset ID you want to verify
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">
                      2. Blockchain Check
                    </p>
                    <p className="text-xs text-muted-foreground">
                      We verify the asset exists on Algorand
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">
                      3. Metadata Retrieval
                    </p>
                    <p className="text-xs text-muted-foreground">
                      View complete metadata from IPFS
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">
                      4. Results Display
                    </p>
                    <p className="text-xs text-muted-foreground">
                      See all details and verification status
                    </p>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="p-6 rounded-lg bg-green-50 border border-green-200 text-green-900">
                <h3 className="font-semibold mb-3">✓ Why Verify?</h3>
                <ul className="text-xs space-y-2">
                  <li>✓ Ensure authenticity</li>
                  <li>✓ Check creator details</li>
                  <li>✓ View project information</li>
                  <li>✓ Verify metadata integrity</li>
                  <li>✓ Confirm blockchain registration</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
  );
};

export default VerifyCredits;
