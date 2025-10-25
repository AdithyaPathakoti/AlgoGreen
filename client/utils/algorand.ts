import { ALGORAND_NETWORK, ALGORAND_TOKEN_HEADERS, ASSET_ID_PREFIX, NETWORKS } from "./constants";
import * as algosdk from "algosdk";

export interface CreditNFT {
  assetId: number;
  name: string;
  amount: number;
  organization: string;
  issueDate: string;
  verified: boolean;
  metadata: Record<string, string>;
  ipfsHash?: string;
}

export interface TransactionResult {
  txId: string;
  assetId?: number;
  status: "success" | "pending" | "failed";
  message: string;
}

function getAlgodClient(network: typeof NETWORKS[keyof typeof NETWORKS] = NETWORKS.TESTNET) {
  const base = network === NETWORKS.MAINNET ? ALGORAND_NETWORK.MAINNET : ALGORAND_NETWORK.TESTNET;
  // algosdk accepts either a token string/object, a base server URL, and a port (empty for https)
  return new algosdk.Algodv2(ALGORAND_TOKEN_HEADERS as any, base, "");
}

// Placeholder: Connect to Algorand wallet
export const connectWallet = async (): Promise<string> => {
  try {
    // Wallet connection requires a browser wallet integration (e.g. MyAlgoConnect, AlgoSigner)
    // This helper currently returns a mock address. Integrate a wallet provider for real signing.
    const mockAddress = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HVY";
    return mockAddress;
  } catch (error) {
    console.error("Failed to connect wallet:", error);
    throw error;
  }
};

// Placeholder: Get wallet balance
export const getWalletBalance = async (address: string): Promise<number> => {
  try {
    const algod = getAlgodClient();
    const info = await algod.accountInformation(address).do();
    // balance is in microAlgos
    const microAlgos = info.amount ?? 0;
    return microAlgos / 1e6;
  } catch (error) {
    console.error("Failed to get wallet balance:", error);
    throw error;
  }
};

// Placeholder: Mint a new carbon credit NFT
export const mintNFT = async (
  fromAddress: string | undefined,
  organizationName: string,
  creditAmount: number,
  description: string,
  ipfsHash: string
): Promise<TransactionResult> => {
  try {
    // Wallet signing must be implemented in the UI (AlgoSigner/MyAlgoConnect) — this function prepares the txn.
    if (!fromAddress) {
      return {
        txId: "",
        status: "failed",
        message: "Sender address required to prepare asset creation transaction. Connect a wallet and provide the address.",
      };
    }

    const algod = getAlgodClient();
    const suggestedParams = await algod.getTransactionParams().do();

    const total = creditAmount;
    const decimals = 0;
    const defaultFrozen = false;
    const unitName = "CARB";
    const assetName = `${ASSET_ID_PREFIX}${Date.now()}`;
    const assetURL = ipfsHash ? `ipfs://${ipfsHash}` : undefined;

    const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
      from: fromAddress,
      total,
      decimals,
      defaultFrozen,
      unitName,
      assetName,
      assetURL,
      suggestedParams,
    } as any);

    // We can't sign here (no wallet). Return basic info to indicate the txn is ready to sign.
    return {
      txId: "",
      status: "pending",
      message: "Asset creation transaction prepared. Sign and submit using a connected wallet.",
    };
  } catch (error) {
    console.error("Failed to mint NFT:", error);
    return {
      txId: "",
      status: "failed",
      message: "Failed to mint NFT",
    };
  }
};

// Placeholder: Transfer NFT to another address
export const transferNFT = async (
  fromAddress: string | undefined,
  assetId: number,
  recipientAddress: string,
  amount: number
): Promise<TransactionResult> => {
  try {
    if (!fromAddress) {
      return {
        txId: "",
        status: "failed",
        assetId,
        message: "Sender address required to prepare asset transfer transaction. Connect a wallet and provide the address.",
      };
    }

    const algod = getAlgodClient();
    const suggestedParams = await algod.getTransactionParams().do();

    const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: fromAddress,
      to: recipientAddress,
      assetIndex: assetId,
      amount,
      suggestedParams,
    } as any);

    return {
      txId: "",
      assetId,
      status: "pending",
      message: "Asset transfer transaction prepared. Sign and submit using a connected wallet.",
    };
  } catch (error) {
    console.error("Failed to transfer NFT:", error);
    return {
      txId: "",
      status: "failed",
      message: "Failed to transfer NFT",
    };
  }
};

// Placeholder: Verify NFT authenticity
export const verifyNFT = async (
  assetId: number
): Promise<{
  verified: boolean;
  metadata: Record<string, string>;
  creator: string;
  creationDate: string;
}> => {
  try {
    const algod = getAlgodClient();
    const assetInfo = await algod.getAssetByID(assetId).do();
    const params = assetInfo.params ?? {};
    const creator = params.creator ?? "";
    const url = params.url ?? "";
    const metadata: Record<string, string> = {};
    if (url && url.startsWith("ipfs://")) {
      metadata.ipfs = url.replace("ipfs://", "");
    } else if (url) {
      metadata.url = url;
    }

    return {
      verified: !!creator,
      metadata,
      creator,
      creationDate: new Date((params['created-at'] || Date.now())).toISOString().split("T")[0],
    };
  } catch (error) {
    console.error("Failed to verify NFT:", error);
    return {
      verified: false,
      metadata: {},
      creator: "",
      creationDate: "",
    };
  }
};

// Placeholder: Get user's credits
export const getUserCredits = async (
  address: string
): Promise<CreditNFT[]> => {
  try {
    const algod = getAlgodClient();
    const info = await algod.accountInformation(address).do();
    const assets = info['assets'] || [];

    const credits: CreditNFT[] = [];
    for (const a of assets) {
      const assetId = a['asset-id'];
      try {
        const assetInfo = await algod.getAssetByID(assetId).do();
        const params = assetInfo.params || {};
        const name = params.name || `${ASSET_ID_PREFIX}${assetId}`;
        // Simple heuristic: include assets created by known creator or matching prefix
        credits.push({
          assetId,
          name,
          amount: a['amount'] || 0,
          organization: (params['creator'] as string) || "",
          issueDate: new Date((params['created-at'] || Date.now())).toISOString().split("T")[0],
          verified: true,
          metadata: {
            unitName: params['unit-name'] || "",
            url: params['url'] || "",
          },
          ipfsHash: params['url'] && (params['url'] as string).startsWith("ipfs://") ? (params['url'] as string).replace("ipfs://", "") : undefined,
        });
      } catch (e) {
        // ignore asset lookup errors and continue
      }
    }

    if (credits.length) return credits;

    const mockCredits: CreditNFT[] = [
      {
        assetId: 1001,
        name: "Solar Energy Credits 2024",
        amount: 100,
        organization: "GreenTech Solar",
        issueDate: "2024-01-15",
        verified: true,
        metadata: {
          type: "Solar Energy",
          location: "California, USA",
        },
      },
      {
        assetId: 1002,
        name: "Wind Energy Credits 2024",
        amount: 50,
        organization: "WindFarm Global",
        issueDate: "2024-02-20",
        verified: true,
        metadata: {
          type: "Wind Energy",
          location: "Texas, USA",
        },
      },
    ];
    return mockCredits;
  } catch (error) {
    console.error("Failed to get user credits:", error);
    return [];
  }
};

// Placeholder: Get credit details by asset ID
export const getCreditDetails = async (
  assetId: number
): Promise<CreditNFT | null> => {
  try {
    // In a real implementation, this would query the blockchain
    const mockCredit: CreditNFT = {
      assetId,
      name: "Carbon Credit - Renewable Energy",
      amount: 100,
      organization: "Green Energy Inc",
      issueDate: "2024-01-15",
      verified: true,
      metadata: {
        certificationBody: "Gold Standard",
        projectType: "Solar Energy",
        location: "California, USA",
        certificationDate: "2024-01-10",
      },
      ipfsHash: "QmExample123...",
    };
    return mockCredit;
  } catch (error) {
    console.error("Failed to get credit details:", error);
    return null;
  }
};

// Placeholder: Get transaction history
export const getTransactionHistory = async (
  address: string
): Promise<Array<{
  id: string;
  type: "mint" | "transfer" | "receive";
  amount: number;
  date: string;
  assetId: number;
  counterparty: string;
  status: "confirmed" | "pending";
}>> => {
  try {
    // In a real implementation, this would query Algorand indexer
    return [
      {
        id: "TXN001",
        type: "mint",
        amount: 100,
        date: new Date().toISOString().split("T")[0],
        assetId: 1001,
        counterparty: address,
        status: "confirmed",
      },
      {
        id: "TXN002",
        type: "transfer",
        amount: 25,
        date: new Date(Date.now() - 86400000).toISOString().split("T")[0],
        assetId: 1001,
        counterparty: "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBY5HVY",
        status: "confirmed",
      },
    ];
  } catch (error) {
    console.error("Failed to get transaction history:", error);
    return [];
  }
};
