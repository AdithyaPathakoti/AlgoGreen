import React from "react";
import { formatDate } from "../utils/helpers";

export interface ActivityItem {
  id: string;
  type: "mint" | "transfer" | "receive" | "verify" | "trade";
  title: string;
  description?: string;
  date: Date | string;
  status: "success" | "pending" | "failed";
  amount?: number;
  icon?: React.ReactNode;
}

interface ActivityFeedProps {
  activities: ActivityItem[];
  isLoading?: boolean;
  onActivityClick?: (activity: ActivityItem) => void;
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({
  activities,
  isLoading = false,
  onActivityClick,
}) => {
  const getActivityIcon = (
    type: ActivityItem["type"]
  ): React.ReactNode => {
    const iconMap = {
      mint: "🔨",
      transfer: "📤",
      receive: "📥",
      verify: "✓",
      trade: "🔄",
    };
    return iconMap[type];
  };

  const getStatusColor = (
    status: ActivityItem["status"]
  ): string => {
    const colorMap = {
      success: "text-green-600",
      pending: "text-yellow-600",
      failed: "text-red-600",
    };
    return colorMap[status];
  };

  const getStatusBgColor = (
    status: ActivityItem["status"]
  ): string => {
    const bgColorMap = {
      success: "bg-green-100",
      pending: "bg-yellow-100",
      failed: "bg-red-100",
    };
    return bgColorMap[status];
  };

  if (isLoading) {
    return (
      <div className="p-6 rounded-lg border border-border bg-card text-card-foreground">
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Recent Activity
        </h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-muted rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="p-6 rounded-lg border border-border bg-card text-card-foreground text-center">
        <p className="text-muted-foreground">No activities yet</p>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-lg border border-border bg-card text-card-foreground">
      <h3 className="text-lg font-semibold mb-4 text-foreground">
        Recent Activity
      </h3>
      <div className="space-y-3">
        {activities.map((activity) => (
          <div
            key={activity.id}
            onClick={() => onActivityClick?.(activity)}
            className={`p-4 rounded-lg border border-border/50 flex items-start gap-4 transition-all duration-200 ${
              onActivityClick
                ? "cursor-pointer hover:border-primary/50 hover:shadow-md"
                : ""
            }`}
          >
            {/* Icon */}
            <div className="flex-shrink-0 text-2xl">
              {activity.icon || getActivityIcon(activity.type)}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-medium text-foreground">
                    {activity.title}
                  </p>
                  {activity.description && (
                    <p className="text-sm text-muted-foreground">
                      {activity.description}
                    </p>
                  )}
                </div>
                {activity.amount && (
                  <div className="text-right flex-shrink-0">
                    <p className="font-semibold text-foreground">
                      +{activity.amount}
                    </p>
                    <p className="text-xs text-muted-foreground">credits</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xs text-muted-foreground">
                  {typeof activity.date === "string"
                    ? activity.date
                    : formatDate(activity.date)}
                </span>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${getStatusBgColor(
                    activity.status
                  )} ${getStatusColor(activity.status)}`}
                >
                  {activity.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
