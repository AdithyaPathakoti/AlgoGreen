import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LayoutWrapper from "../components/LayoutWrapper";
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
          .slice(0, 5)
          .map((h) => ({
            id: h.id,
            type: h.type,
            title:
              h.type === "mint"
                ? "Minted Carbon Credits"
                : h.type === "transfer"
                  ? "Transferred Credits"
                  : "Received Credits",
            description: `${h.amount} MT CO₂ • Asset ID: ${h.assetId}`,
            date: h.date,
            status: h.status,
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
    { label: "Credits Held", value: stats.creditsHeld, color: "bg-primary" },
    {
      label: "Credits Traded",
      value: stats.creditsTraded,
      color: "bg-secondary",
    },
  ];

  return (
    <LayoutWrapper>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's your carbon credit overview.
          </p>
        </div>

        {/* Not Connected State */}
        {!isConnected && (
          <div className="p-6 rounded-lg bg-blue-50 border border-blue-200 text-blue-900">
            <h3 className="font-semibold mb-2">🔗 Connect Your Wallet</h3>
            <p className="text-sm mb-4">
              Connect your Algorand wallet to view your carbon credits and
              transaction history.
            </p>
            <Button variant="primary">Connect Wallet</Button>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon="📊"
            title="Total Credits Minted"
            value={stats.totalCredits}
            subtitle="Metric tons CO₂"
            trend="up"
            trendValue="+12%"
          />
          <StatCard
            icon="🌍"
            title="Total CO₂ Offset"
            value={`${stats.totalOffset} MT`}
            subtitle="Carbon eliminated"
            trend="up"
            trendValue="+12%"
          />
          <StatCard
            icon="🎫"
            title="Credits Held"
            value={stats.creditsHeld}
            subtitle="Available for trade"
          />
          <StatCard
            icon="🔄"
            title="Credits Traded"
            value={stats.creditsTraded}
            subtitle="Total transferred"
            trend="neutral"
            trendValue="0"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview Chart */}
            <OverviewChart
              title="Credit Distribution"
              data={chartData}
              type="pie"
              height={300}
            />

            {/* Quick Actions */}
            <div className="p-6 rounded-lg border border-border bg-card text-card-foreground">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link to="/mint">
                  <Button variant="primary" className="w-full">
                    Mint Credits
                  </Button>
                </Link>
                <Link to="/credits">
                  <Button variant="secondary" className="w-full">
                    View Credits
                  </Button>
                </Link>
                <Link to="/trade">
                  <Button variant="secondary" className="w-full">
                    Trade Credits
                  </Button>
                </Link>
                <Link to="/verify">
                  <Button variant="secondary" className="w-full">
                    Verify Credit
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Wallet Info */}
            {isConnected && (
              <div className="p-6 rounded-lg border border-border bg-card text-card-foreground mb-6">
                <h3 className="font-semibold text-foreground mb-4">
                  Wallet Info
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Balance</p>
                    <p className="text-2xl font-bold text-primary">{balance}</p>
                    <p className="text-xs text-muted-foreground">ALGO</p>
                  </div>
                  <Link to="/profile">
                    <Button variant="ghost" className="w-full text-sm">
                      View Full Profile →
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {/* Stats Summary */}
            <div className="p-6 rounded-lg border border-border bg-gradient-to-br from-primary/10 to-accent/10">
              <h3 className="font-semibold text-foreground mb-4">Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Total Minted
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {stats.totalCredits} MT
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Held</span>
                  <span className="text-sm font-semibold text-foreground">
                    {stats.creditsHeld} MT
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Traded</span>
                  <span className="text-sm font-semibold text-foreground">
                    {stats.creditsTraded} MT
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <ActivityFeed activities={activities} isLoading={isLoading} />
      </div>
    </LayoutWrapper>
  );
};

export default Dashboard;
