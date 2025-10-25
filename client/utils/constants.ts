export const ALGORAND_NETWORK = {
  TESTNET: "https://testnet-api.algonode.cloud",
  MAINNET: "https://mainnet-api.algonode.cloud",
};

export const ALGORAND_TOKEN_HEADERS = {
  "X-API-Key": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
};

export const ASSET_ID_PREFIX = "CARBON_CREDIT_";

export const NETWORKS = {
  TESTNET: "testnet" as const,
  MAINNET: "mainnet" as const,
};

export const APP_NAME = "Carbon Credit Tracker";
export const APP_DESCRIPTION =
  "Track, mint, verify, and trade carbon credit NFTs on Algorand";

export const PAGINATION = {
  CREDITS_PER_PAGE: 12,
  ACTIVITIES_PER_PAGE: 10,
};

export const TOAST_DURATION = 5000;

export const DEFAULT_GAS_LIMIT = 1000000;

export const CREDIT_STATUS = {
  PENDING: "pending",
  MINTED: "minted",
  VERIFIED: "verified",
  TRADED: "traded",
} as const;

export const MIN_CREDIT_AMOUNT = 1;
export const MAX_CREDIT_AMOUNT = 1000000;
