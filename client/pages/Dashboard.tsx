import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StatCard from "../components/StatCard";
import OverviewChart from "../components/OverviewChart";
import ActivityFeed, { ActivityItem } from "../components/ActivityFeed";
import Button from "../components/Button";
import { useWallet } from "../context/WalletContext";
import { getUserCredits, getTransactionHistory } from "../utils/algorand";

const Dashboard: React.FC = () => {
  const { isConnected, address, balance } = useWallet();
  const [stats, setStats] = useState({
    totalCredits: 0,
    totalOffset: 0,
    creditsHeld: 0,
    creditsTraded: 0,
  });
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!isConnected || !address) {
        setIsLoading(false);
        return;
      }

      try {
        const credits = await getUserCredits(address);
        const history = await getTransactionHistory(address);

        const totalCredits = credits.reduce((sum, c) => sum + c.amount, 0);
        const tradedCredits = history
          .filter((h) => h.type === "transfer")
          .reduce((sum, h) => sum + h.amount, 0);

        setStats({
          totalCredits,
          totalOffset: totalCredits,
          creditsHeld: totalCredits - tradedCredits,
          creditsTraded: tradedCredits,
        });

        const formattedActivities: ActivityItem[] = history
          .slice(0, 6)
          .map((h) => ({
            id: h.id,
            type: h.type,
            title:
              h.type === "mint"
                ? "Minted"
                : h.type === "transfer"
                ? "Transferred"
                : "Received",
            description: `${h.amount} MT • Asset ${h.assetId}`,
            date: h.date,
            status: h.status === "confirmed" ? "success" : (h.status as any),
            amount: h.amount,
          }));

        setActivities(formattedActivities);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [isConnected, address]);

  const chartData = [
    { label: "Held", value: stats.creditsHeld, color: "#10b981" },
    { label: "Traded", value: stats.creditsTraded, color: "#60a5fa" },
  ];

  return (
    <main role="main" className="space-y-8">
      <div>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Your carbon credit activity and quick actions.</p>
          </div>
          <div className="flex items-center gap-3">
            <label htmlFor="date-range" className="sr-only">Date range</label>
            <select id="date-range" className="px-3 py-2 border rounded text-sm">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>All time</option>
            </select>
            <Link to="/credits">
              <Button variant="ghost" size="sm">My Credits</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Top Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Credits" value={stats.totalCredits} subtitle="MT CO₂" icon="🌍" />
        <StatCard title="Held" value={stats.creditsHeld} subtitle="Available" icon="📥" />
        <StatCard title="Traded" value={stats.creditsTraded} subtitle="Transferred" icon="🔁" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <OverviewChart title="Distribution" data={chartData} type="bar" height={260} />

          <div className="p-6 rounded-lg border border-border bg-card">
            <h3 className="text-lg font-semibold mb-3">Quick actions</h3>
            <div className="flex flex-wrap gap-3">
              <Link to="/mint"><Button variant="primary">Mint Credits</Button></Link>
              <Link to="/trade"><Button variant="secondary">Trade Credits</Button></Link>
              <Link to="/credits"><Button variant="outline">My Credits</Button></Link>
              <Link to="/verify"><Button variant="ghost">Verify</Button></Link>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">Tip: Use quick actions to complete common flows.</div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="p-6 rounded-lg border border-border bg-card mb-6">
            <h4 className="font-semibold">Wallet</h4>
            <p className="mt-2 text-sm text-muted-foreground">{isConnected ? `${balance} ALGO` : "Not connected"}</p>
            <div className="mt-4">
              <Link to="/profile"><Button variant="ghost">Profile</Button></Link>
            </div>
          </div>

          <div className="p-6 rounded-lg border border-border bg-card">
            <h4 className="font-semibold mb-3">Recent activity</h4>
            <ActivityFeed activities={activities} isLoading={isLoading} compact />
            <div className="mt-3 text-sm text-muted-foreground">View full activity on your profile page.</div>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Dashboard;
