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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Your carbon credit activity and quick actions.</p>
      </div>

      {/* Top Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Credits" value={stats.totalCredits} subtitle="MT CO₂" icon="�" />
        <StatCard title="Held" value={stats.creditsHeld} subtitle="Available" icon="📥" />
        <StatCard title="Traded" value={stats.creditsTraded} subtitle="Transferred" icon="🔁" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <OverviewChart title="Distribution" data={chartData} type="bar" height={260} />

          <div className="p-6 rounded-lg border border-border bg-card">
            <h3 className="text-lg font-semibold mb-3">Quick actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link to="/mint">
                <Button variant="primary" className="w-full">Mint Credits</Button>
              </Link>
              <Link to="/trade">
                <Button variant="secondary" className="w-full">Trade Credits</Button>
              </Link>
              <Link to="/credits">
                <Button variant="ghost" className="w-full">My Credits</Button>
              </Link>
              <Link to="/verify">
                <Button variant="ghost" className="w-full">Verify</Button>
              </Link>
            </div>
          </div>
        </div>

        <aside>
          <div className="p-6 rounded-lg border border-border bg-card mb-6">
            <h4 className="font-semibold">Wallet</h4>
            <p className="mt-2 text-sm text-muted-foreground">{isConnected ? `${balance} ALGO` : "Not connected"}</p>
            <div className="mt-4">
              <Link to="/profile">
                <Button variant="ghost" className="w-full">Profile</Button>
              </Link>
            </div>
          </div>

          <div className="p-6 rounded-lg border border-border bg-card">
            <h4 className="font-semibold mb-3">Recent activity</h4>
            <ActivityFeed activities={activities} isLoading={isLoading} compact />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
