import React, { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";
import Dropdown from "./Dropdown";

export interface MintFormData {
  organizationName: string;
  creditAmount: number;
  description: string;
  certificateType: string;
  issueDate: string;
  location: string;
}

interface MintFormProps {
  onSubmit: (data: MintFormData) => Promise<void>;
  isLoading?: boolean;
}

const MintForm: React.FC<MintFormProps> = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState<MintFormData>({
    organizationName: "",
    creditAmount: 0,
    description: "",
    certificateType: "Gold Standard",
    issueDate: new Date().toISOString().split("T")[0],
    location: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof MintFormData, string>>>({});

  const validateForm = (): boolean => {
  const newErrors: Partial<Record<keyof MintFormData, string>> = {};

    if (!formData.organizationName.trim()) {
      newErrors.organizationName = "Organization name is required";
    }
    if (formData.creditAmount <= 0) {
      newErrors.creditAmount = "Credit amount must be greater than 0";
    }
    if (formData.creditAmount > 1000000) {
      newErrors.creditAmount = "Credit amount cannot exceed 1,000,000";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
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
      organizationName: "",
      creditAmount: 0,
      description: "",
      certificateType: "Gold Standard",
      issueDate: new Date().toISOString().split("T")[0],
      location: "",
    });
    setErrors({});
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "creditAmount" ? parseFloat(value) : value,
    }));
  };

  return (
  <form onSubmit={handleSubmit} onReset={handleReset} className="space-y-6">
      <InputField
        label="Organization Name"
        name="organizationName"
        value={formData.organizationName}
        onChange={handleInputChange}
        error={errors.organizationName}
        placeholder="e.g., GreenTech Solar Inc."
        required
      />

      <InputField
        label="Carbon Credit Amount (metric tons CO2)"
        name="creditAmount"
        type="number"
        value={formData.creditAmount}
        onChange={handleInputChange}
        error={errors.creditAmount}
        placeholder="e.g., 100"
        min="1"
        max="1000000"
        required
      />

      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">
          Certificate Type
        </label>
        <Dropdown
          options={[
            { label: "Gold Standard", value: "Gold Standard" },
            { label: "Verified Carbon Standard", value: "VCS" },
            { label: "American Carbon Registry", value: "ACR" },
            { label: "Other", value: "Other" },
          ]}
          value={formData.certificateType}
          onChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              certificateType: value as string,
            }))
          }
        />
        <p className="text-xs text-muted-foreground mt-2">Choose the certification standard that best matches your project. This appears on the NFT metadata.</p>
      </div>

      <InputField
        label="Issue Date"
        name="issueDate"
        type="date"
        value={formData.issueDate}
        onChange={handleInputChange}
        required
      />

      <InputField
        label="Location"
        name="location"
        value={formData.location}
        onChange={handleInputChange}
        error={errors.location}
        placeholder="e.g., California, USA"
        required
      />

      <div className="form-group">
        <label className="text-sm font-medium text-foreground mb-1.5 block">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Describe the carbon credit project details..."
          rows={4}
          className={`w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 ${
            errors.description ? "border-destructive focus:ring-destructive" : ""
          } disabled:opacity-50 disabled:cursor-not-allowed`}
          required
        />
        {errors.description && (
          <p className="text-xs text-destructive mt-1">{errors.description}</p>
        )}
      </div>

      {/* Live inline preview inside the form */}
      {(formData.organizationName || formData.creditAmount > 0) && (
        <div className="p-4 rounded-md bg-surface border border-border text-sm">
          <h4 className="font-medium mb-2">Draft Preview</h4>
          <p className="text-xs text-muted-foreground">
            <span className="font-medium">Org:</span> {formData.organizationName || "—"}
          </p>
          <p className="text-xs text-muted-foreground">
            <span className="font-medium">Amount:</span> {formData.creditAmount} MT
          </p>
          <p className="text-xs text-muted-foreground">
            <span className="font-medium">Type:</span> {formData.certificateType}
          </p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          disabled={isLoading}
          className="w-full sm:w-auto"
        >
          Mint Carbon Credit
        </Button>
        <Button type="reset" variant="ghost" className="w-full sm:w-auto">
          Clear Form
        </Button>
      </div>
    </form>
  );
};

export default MintForm;
