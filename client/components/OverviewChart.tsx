import React from "react";

interface ChartData {
  label: string;
  value: number;
  color?: string;
}

interface OverviewChartProps {
  title: string;
  data: ChartData[];
  height?: number;
  type?: "bar" | "line" | "pie";
}

const OverviewChart: React.FC<OverviewChartProps> = ({
  title,
  data,
  height = 300,
  type = "bar",
}) => {
  const maxValue = Math.max(...data.map((d) => d.value));
  const colors = [
    "bg-primary",
    "bg-secondary",
    "bg-accent",
    "bg-green-500",
    "bg-blue-500",
    "bg-purple-500",
  ];

  if (type === "pie") {
    const total = data.reduce((sum, d) => sum + d.value, 0);

    if (total === 0) {
      return (
        <div className="p-6 rounded-lg border border-border bg-card text-card-foreground">
          <h3 className="text-lg font-semibold mb-6 text-foreground">{title}</h3>
          <div className="flex items-center justify-center py-12">
            <p className="text-muted-foreground">No data available</p>
          </div>
        </div>
      );
    }

    const circles = [];
    let offset = 0;
    data.forEach((item, idx) => {
      const percentage = (item.value / total) * 100;
      const radius = 40;
      const circumference = 2 * Math.PI * radius;
      const strokeDashoffset =
        circumference - (percentage / 100) * circumference;
      const rotation = Math.round(offset);

      circles.push(
        <circle
          key={item.label}
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={item.color || colors[idx % colors.length]}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{
            transformOrigin: "50% 50%",
            transform: `rotate(${rotation}deg)`,
          }}
        />
      );

      offset += (percentage / 100) * 360;
    });

    return (
      <div className="p-6 rounded-lg border border-border bg-card text-card-foreground">
        <h3 className="text-lg font-semibold mb-6 text-foreground">{title}</h3>
        <div className="flex items-center justify-center gap-8">
          <div className="relative w-48 h-48">
            <svg
              viewBox="0 0 100 100"
              className="transform -rotate-90"
              style={{ width: "100%", height: "100%" }}
            >
              {circles}
            </svg>
          </div>
          <div className="space-y-3">
            {data.map((item, idx) => (
              <div key={item.label} className="flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-full ${
                    item.color || colors[idx % colors.length]
                  }`}
                />
                <div className="text-sm">
                  <p className="text-foreground font-medium">{item.label}</p>
                  <p className="text-muted-foreground text-xs">
                    {((item.value / total) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-lg border border-border bg-card text-card-foreground">
      <h3 className="text-lg font-semibold mb-6 text-foreground">{title}</h3>
      <div style={{ height: `${height}px` }} className="flex items-flex-end gap-2">
        {data.map((item, idx) => {
          const heightPercent = (item.value / maxValue) * 100;

          return (
            <div
              key={item.label}
              className="flex-1 flex flex-col items-center gap-2"
            >
              <div
                className={`w-full ${
                  item.color || colors[idx % colors.length]
                } rounded-t-lg transition-all duration-200 hover:opacity-80`}
                style={{ height: `${heightPercent}%` }}
                title={`${item.label}: ${item.value}`}
              />
              <p className="text-xs text-muted-foreground text-center break-words">
                {item.label}
              </p>
            </div>
          );
        })}
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="text-xl font-bold text-foreground">
              {data.reduce((sum, d) => sum + d.value, 0)}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Average</p>
            <p className="text-xl font-bold text-foreground">
              {(data.reduce((sum, d) => sum + d.value, 0) / data.length).toFixed(
                2
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewChart;
