import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// LayoutWrapper is provided at the app level (App.tsx). Pages should not wrap themselves again.
import CreditGrid from "../components/CreditGrid";
import CreditDetailsModal from "../components/CreditDetailsModal";
import Button from "../components/Button";
import { getUserCredits } from "../utils/algorand";
import { useWallet } from "../context/WalletContext";
import { CreditCardData } from "../components/CreditCard";

const MyCredits: React.FC = () => {
  const { isConnected, address } = useWallet();
  const [credits, setCredits] = useState<CreditCardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCredit, setSelectedCredit] = useState<CreditCardData | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  useEffect(() => {
    const loadCredits = async () => {
      if (!isConnected || !address) {
        setIsLoading(false);
        return;
      }

      try {
        const userCredits = await getUserCredits(address);
        const formattedCredits: CreditCardData[] = userCredits.map((c) => ({
          assetId: c.assetId,
          name: c.name,
          amount: c.amount,
          organization: c.organization,
          issueDate: c.issueDate,
          verified: c.verified,
          metadata: c.metadata,
          ipfsHash: c.ipfsHash,
        }));
        setCredits(formattedCredits);
      } catch (error) {
        console.error("Failed to load credits:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCredits();
  }, [isConnected, address]);

  const handleCreditClick = (credit: CreditCardData) => {
    setSelectedCredit(credit);
    setIsDetailsOpen(true);
  };

  const handleTrade = (credit: CreditCardData) => {
    // Navigate to trade page with credit selected
    window.location.href = `/trade?assetId=${credit.assetId}`;
  };

  const handleVerify = (credit: CreditCardData) => {
    // Navigate to verify page with asset ID
    window.location.href = `/verify?assetId=${credit.assetId}`;
  };

  return (
    <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              My Carbon Credits
            </h1>
            <p className="text-muted-foreground">
              View and manage your minted carbon credit NFTs
            </p>
          </div>
          <Link to="/mint">
            <Button variant="primary">Mint New Credits</Button>
          </Link>
        </div>

        {/* Not Connected State */}
        {!isConnected && (
          <div className="p-6 rounded-lg bg-blue-50 border border-blue-200 text-blue-900">
            <h3 className="font-semibold mb-2">🔗 Connect Your Wallet</h3>
            <p className="text-sm">
              Connect your Algorand wallet to view your carbon credits.
            </p>
          </div>
        )}

        {/* Stats */}
        {isConnected && credits.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <p className="text-sm text-muted-foreground">Total Credits</p>
              <p className="text-2xl font-bold text-primary">
                {credits.reduce((sum, c) => sum + c.amount, 0)} MT
              </p>
            </div>
            <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
              <p className="text-sm text-muted-foreground">NFTs Owned</p>
              <p className="text-2xl font-bold text-secondary">{credits.length}</p>
            </div>
            <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
              <p className="text-sm text-muted-foreground">Verified</p>
              <p className="text-2xl font-bold text-accent">
                {credits.filter((c) => c.verified).length}
              </p>
            </div>
          </div>
        )}

        {/* Credits Grid */}
        <CreditGrid
          credits={credits}
          isLoading={isLoading}
          onCreditClick={handleCreditClick}
          onTrade={handleTrade}
          onVerify={handleVerify}
        />

        {/* Filter/Sort Options (Placeholder) */}
        {credits.length > 0 && (
          <div className="p-6 rounded-lg border border-border bg-card text-card-foreground">
            <h3 className="font-semibold text-foreground mb-4">Sort & Filter</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select className="px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                <option>Sort by: Date (Newest)</option>
                <option>Sort by: Amount (High to Low)</option>
                <option>Sort by: Organization</option>
              </select>
              <select className="px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                <option>Filter: All Credits</option>
                <option>Filter: Verified Only</option>
                <option>Filter: Unverified Only</option>
              </select>
            </div>
          </div>
        )}

      {/* Credit Details Modal */}
      {selectedCredit && (
        <CreditDetailsModal
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          credit={selectedCredit}
          onTrade={() => handleTrade(selectedCredit)}
          onVerify={() => handleVerify(selectedCredit)}
        />
      )}
    </div>
  );
};

export default MyCredits;
