import React, { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";

export interface TradeFormData {
  assetId: number;
  recipientAddress: string;
  amount: number;
  message?: string;
}

interface TradeFormProps {
  onSubmit: (data: TradeFormData) => Promise<void>;
  isLoading?: boolean;
  availableAmount?: number;
}

const TradeForm: React.FC<TradeFormProps> = ({
  onSubmit,
  isLoading = false,
  availableAmount = 0,
}) => {
  const [formData, setFormData] = useState<TradeFormData>({
    assetId: 0,
    recipientAddress: "",
    amount: 0,
    message: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof TradeFormData, string>>>({});

  const validateForm = (): boolean => {
  const newErrors: Partial<Record<keyof TradeFormData, string>> = {};

    if (formData.assetId <= 0) {
      newErrors.assetId = "Asset ID is required";
    }
    if (!formData.recipientAddress.trim()) {
      newErrors.recipientAddress = "Recipient address is required";
    } else if (formData.recipientAddress.length !== 58) {
      newErrors.recipientAddress = "Invalid Algorand address format";
    }
    if (formData.amount <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }
    if (formData.amount > availableAmount) {
      newErrors.amount = `Cannot exceed available amount (${availableAmount})`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await onSubmit(formData);
      } catch (error) {
        console.error("Form submission error:", error);
      }
    }
  };

  const handleReset = (e?: React.FormEvent) => {
    e?.preventDefault();
    setFormData({
      assetId: 0,
      recipientAddress: "",
      amount: 0,
      message: "",
    });
    setErrors({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "amount" || name === "assetId"
          ? parseInt(value) || 0
          : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <InputField
        label="Asset ID"
        name="assetId"
        type="number"
        value={formData.assetId || ""}
        onChange={handleInputChange}
        error={errors.assetId}
        placeholder="Enter asset ID"
        required
        helperText="Numeric asset identifier for the credit NFT"
      />

      <InputField
        label="Amount to Transfer"
        name="amount"
        type="number"
        value={formData.amount || ""}
        onChange={handleInputChange}
        error={errors.amount}
        placeholder="0"
        min="1"
        max={availableAmount}
        helperText={`Available: ${availableAmount} credits`}
        required
        trailingIcon={<span className="text-sm text-muted-foreground">MT</span>}
      />

      <InputField
        label="Recipient Address"
        name="recipientAddress"
        value={formData.recipientAddress}
        onChange={handleInputChange}
        error={errors.recipientAddress}
        placeholder="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HVY"
        helperText="58-character Algorand address"
        required
        className="font-mono"
      />

      <InputField
        label="Message (Optional)"
        name="message"
        value={formData.message || ""}
        onChange={handleInputChange}
        placeholder="Add a message for the recipient..."
        multiline
        rows={3}
      />

      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          disabled={isLoading}
          className="w-full sm:w-auto"
        >
          Transfer Credits
        </Button>
        <Button type="reset" variant="ghost" className="w-full sm:w-auto" onClick={handleReset}>
          Clear Form
        </Button>
      </div>
    </form>
  );
};

export default TradeForm;
