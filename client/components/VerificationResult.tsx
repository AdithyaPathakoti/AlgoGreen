import React from "react";
import Button from "./Button";

interface VerificationData {
  verified: boolean;
  metadata: Record<string, string>;
  creator: string;
  creationDate: string;
}

interface VerificationResultProps {
  data: VerificationData;
  assetId: string;
  onReset?: () => void;
}

const VerificationResult: React.FC<VerificationResultProps> = ({
  data,
  assetId,
  onReset,
}) => {
  const statusColor = data.verified
    ? "bg-green-50 border-green-200"
    : "bg-red-50 border-red-200";
  const statusTextColor = data.verified ? "text-green-900" : "text-red-900";
  const statusIcon = data.verified ? "✓" : "✕";

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Status Card */}
      <div
        className={`rounded-lg border p-6 ${statusColor} animate-slide-up`}
      >
        <div className="flex items-start gap-4">
          <div
            className={`text-4xl font-bold ${statusTextColor}`}
          >
            {statusIcon}
          </div>
          <div className="flex-1">
            <h3
              className={`text-2xl font-bold ${statusTextColor} mb-2`}
            >
              {data.verified
                ? "NFT Verified ✓"
                : "Verification Failed"}
            </h3>
            <p className={`${statusTextColor} text-sm`}>
              {data.verified
                ? "This carbon credit NFT is authentic and registered on the Algorand blockchain."
                : "This asset could not be verified. Please check the asset ID and try again."}
            </p>
          </div>
        </div>
      </div>

      {/* Details */}
      {data.verified && (
        <div className="rounded-lg border border-border bg-card text-card-foreground">
          <div className="p-6 space-y-4">
            <h4 className="font-semibold text-foreground mb-4">
              Verification Details
            </h4>

            {/* Asset Info */}
            <div className="p-4 rounded-lg bg-muted/50 border border-border">
              <p className="text-xs text-muted-foreground mb-1">Asset ID</p>
              <p className="font-mono font-semibold text-foreground">
                {assetId}
              </p>
            </div>

            {/* Creator and Date */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <p className="text-xs text-muted-foreground mb-1">
                  Creator Address
                </p>
                <p className="text-xs font-mono text-foreground break-all">
                  {data.creator.slice(0, 16)}...{data.creator.slice(-16)}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <p className="text-xs text-muted-foreground mb-1">
                  Creation Date
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {data.creationDate}
                </p>
              </div>
            </div>

            {/* Metadata */}
            {Object.keys(data.metadata).length > 0 && (
              <div>
                <h5 className="font-medium text-foreground mb-3">
                  Credit Metadata
                </h5>
                <div className="space-y-2">
                  {Object.entries(data.metadata).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between items-center p-3 rounded-lg bg-muted/50"
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

            {/* Verification Badges */}
            <div className="pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground mb-3">
                Verified by
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                  ✓ Algorand Blockchain
                </span>
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                  ✓ IPFS Metadata
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        {onReset && (
          <Button onClick={onReset} variant="ghost" className="flex-1">
            Verify Another NFT
          </Button>
        )}
        <Button
          onClick={() => window.location.href = "/credits"}
          variant="primary"
          className="flex-1"
        >
          View All Credits
        </Button>
      </div>
    </div>
  );
};

export default VerificationResult;
