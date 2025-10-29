import React, { useState } from "react";
// LayoutWrapper provided by App.tsx
import VerifyForm, { VerifyFormData } from "../components/VerifyForm";
import VerificationResult from "../components/VerificationResult";
import Loader from "../components/Loader";
import { useToast } from "../components/ToastNotification";
import { verifyNFT } from "../utils/algorand";
import Button from "../components/Button";

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
    <main role="main" className="space-y-8">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-1">Verify Credits</h1>
          <p className="text-muted-foreground">Verify the authenticity of carbon credit NFTs on the Algorand blockchain</p>
          <div className="mt-3 text-sm text-muted-foreground">Enter an Asset ID to fetch on-chain registration and metadata from IPFS.</div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handleReset}>Reset</Button>
          <Button variant="primary" size="sm" onClick={() => window.location.href = '/help'}>How verification works</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="p-6 rounded-lg border border-border bg-card text-card-foreground">
            {isVerifying ? (
              <Loader size="lg" message="Verifying NFT..." fullScreen={false} />
            ) : verificationData ? (
              <div className="space-y-4">
                <VerificationResult data={verificationData} assetId={currentAssetId} onReset={handleReset} />
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => navigator.clipboard?.writeText(currentAssetId || '')}>Copy Asset ID</Button>
                  <Button variant="outline" size="sm" onClick={() => window.open(`https://algoexplorer.io/asset/${currentAssetId}`, '_blank')}>Open in Explorer</Button>
                </div>
              </div>
            ) : (
              <VerifyForm onSubmit={handleVerify} isLoading={isVerifying} />
            )}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="p-6 rounded-lg border border-border bg-muted/50">
            <h3 className="font-semibold text-foreground mb-3">How it works</h3>
            <ol className="text-sm list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Enter the Algorand asset ID</li>
              <li>We check on-chain registration</li>
              <li>We fetch metadata from IPFS (if present)</li>
              <li>Results show creator and timestamp</li>
            </ol>
          </div>

          <div className="p-6 rounded-lg bg-green-50 border border-green-200 text-green-900">
            <h3 className="font-semibold mb-3">Why verify?</h3>
            <ul className="text-xs space-y-2">
              <li>✓ Ensure authenticity</li>
              <li>✓ View creator and metadata</li>
              <li>✓ Confirm IPFS-hosted details</li>
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default VerifyCredits;
