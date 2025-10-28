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
      />

      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">
          Message (Optional)
        </label>
        <textarea
          name="message"
          value={formData.message || ""}
          onChange={handleInputChange}
          placeholder="Add a message for the recipient..."
          rows={3}
          className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          disabled={isLoading}
        >
          Transfer Credits
        </Button>
        <Button type="reset" variant="ghost">
          Clear Form
        </Button>
      </div>
    </form>
  );
};

export default TradeForm;
