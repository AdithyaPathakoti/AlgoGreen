import React, { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";

export interface VerifyFormData {
  assetId: string;
}

interface VerifyFormProps {
  onSubmit: (data: VerifyFormData) => Promise<void>;
  isLoading?: boolean;
}

const VerifyForm: React.FC<VerifyFormProps> = ({ onSubmit, isLoading = false }) => {
  const [assetId, setAssetId] = useState("");
  const [error, setError] = useState("");

  const validateForm = (): boolean => {
    setError("");
    if (!assetId.trim()) {
      setError("Asset ID is required");
      return false;
    }
    if (!/^\d+$/.test(assetId)) {
      setError("Asset ID must be a valid number");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await onSubmit({ assetId });
      } catch (error) {
        console.error("Form submission error:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
      <InputField
        label="Asset ID or NFT ID"
        value={assetId}
        onChange={(e) => setAssetId(e.target.value)}
        error={error}
        placeholder="e.g., 1234567890"
        helperText="Enter the Algorand asset ID of the carbon credit NFT you want to verify"
        required
      />

      <div className="bg-blue-50 border border-blue-200 text-blue-900 rounded-lg p-4 text-sm">
        <p className="font-medium mb-2">How to find your Asset ID:</p>
        <ul className="list-disc list-inside space-y-1 text-xs">
          <li>Check your transaction receipt from minting</li>
          <li>Look it up on Algorand Explorer</li>
          <li>View it in your wallet app</li>
        </ul>
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          disabled={isLoading}
        >
          Verify NFT
        </Button>
        <Button
          type="reset"
          variant="ghost"
          onClick={() => {
            setAssetId("");
            setError("");
          }}
        >
          Clear
        </Button>
      </div>
    </form>
  );
};

export default VerifyForm;
