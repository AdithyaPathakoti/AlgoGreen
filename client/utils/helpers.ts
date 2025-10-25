export const formatAddress = (address: string): string => {
  if (!address) return "";
  return `${address.slice(0, 8)}...${address.slice(-8)}`;
};

export const formatDate = (date: Date | number): string => {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatDateTime = (date: Date | number): string => {
  const d = new Date(date);
  return d.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(num);
};

export const formatCurrency = (num: number, symbol = "A"): string => {
  return `${symbol} ${formatNumber(num)}`;
};

export const calculateCO2Offset = (creditAmount: number): number => {
  // 1 carbon credit = 1 metric ton of CO2
  return creditAmount;
};

export const isValidAlgorandAddress = (address: string): boolean => {
  // Algorand addresses are 58 characters long and base32 encoded
  return address.length === 58 && /^[A-Z2-7]+$/.test(address);
};

export const isValidAssetId = (assetId: string | number): boolean => {
  const id = typeof assetId === "string" ? parseInt(assetId) : assetId;
  return id > 0 && id < Number.MAX_SAFE_INTEGER;
};

export const truncateString = (str: string, length: number): string => {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
};

export const generateMockTransactionId = (): string => {
  return `TXN${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
};

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const calculateTotalOffset = (credits: Array<{ amount: number }>): number => {
  return credits.reduce((total, credit) => total + credit.amount, 0);
};
