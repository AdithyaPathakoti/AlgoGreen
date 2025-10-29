import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  const [filter, setFilter] = useState("all");

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

  const filtered = credits.filter((c) => (filter === "all" ? true : filter === "verified" ? c.verified : !c.verified));

  const handleCreditClick = (credit: CreditCardData) => {
    setSelectedCredit(credit);
    setIsDetailsOpen(true);
  };

  const handleTrade = (credit: CreditCardData) => {
    window.location.href = `/trade?assetId=${credit.assetId}`;
  };

  const [query, setQuery] = useState("");

  const bulkSelected = 0; // placeholder for future bulk actions

  return (
    <main role="main" className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Credits</h1>
          <p className="text-muted-foreground">Manage and inspect your minted carbon credits.</p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <label htmlFor="credits-search" className="sr-only">Search credits</label>
          <input id="credits-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name or asset id" className="px-3 py-2 border rounded w-full sm:w-64" />
          <label htmlFor="credits-filter" className="sr-only">Filter credits</label>
          <select id="credits-filter" value={filter} onChange={(e) => setFilter(e.target.value)} className="px-3 py-2 border rounded text-sm" aria-label="Filter credits">
            <option value="all">All</option>
            <option value="verified">Verified</option>
            <option value="unverified">Unverified</option>
          </select>
          <Link to="/mint"><Button variant="primary">Mint</Button></Link>
        </div>
      </div>

      {!isConnected && (
        <div className="p-6 rounded-lg bg-muted/20 border">Connect your wallet to see credits</div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <CreditGrid
          credits={filtered.filter(c => (query ? ((c.name || '').toLowerCase().includes(query.toLowerCase()) || String(c.assetId).includes(query)) : true))}
          isLoading={isLoading}
          onCreditClick={handleCreditClick}
          onTrade={handleTrade}
          onVerify={() => {}}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">Showing {filtered.length} credits</div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" disabled={bulkSelected === 0}>Bulk Transfer</Button>
          <Button variant="outline" size="sm">Export</Button>
        </div>
      </div>

      {isConnected && !isLoading && filtered.length === 0 && (
        <div className="p-6 rounded-lg bg-muted/20 border text-center">
          <p className="mb-3">You don't have any credits yet.</p>
          <Link to="/mint">
            <Button variant="primary">Mint your first credit</Button>
          </Link>
        </div>
      )}

      {selectedCredit && (
        <CreditDetailsModal
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          credit={selectedCredit}
          onTrade={() => handleTrade(selectedCredit)}
          onVerify={() => {}}
        />
      )}
    </main>
  );
};

export default MyCredits;
