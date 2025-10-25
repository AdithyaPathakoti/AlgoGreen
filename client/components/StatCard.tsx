import React from "react";

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  onClick?: () => void;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  title,
  value,
  subtitle,
  trend,
  trendValue,
  onClick,
  className = "",
}) => {
  const trendColor = {
    up: "text-green-600",
    down: "text-red-600",
    neutral: "text-muted-foreground",
  };

  const trendIcon = {
    up: "↑",
    down: "↓",
    neutral: "→",
  };

  return (
    <div
      onClick={onClick}
      className={`p-6 rounded-lg border border-border bg-card text-card-foreground hover:shadow-lg transition-all duration-200 ${
        onClick ? "cursor-pointer hover:border-primary/50" : ""
      } ${className}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-lg bg-primary/10 text-primary text-xl">
          {icon}
        </div>
        {trend && trendValue && (
          <div className={`text-sm font-semibold ${trendColor[trend]}`}>
            <span>{trendIcon[trend]} </span>
            {trendValue}
          </div>
        )}
      </div>
      <h3 className="text-sm font-medium text-muted-foreground mb-1">
        {title}
      </h3>
      <p className="text-2xl font-bold text-foreground mb-2">{value}</p>
      {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
    </div>
  );
};

export default StatCard;
