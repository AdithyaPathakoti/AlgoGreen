import React from "react";
import Button from "./Button";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  image?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  image,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      {image ? (
        <img src={image} alt={title} className="w-48 h-48 mb-6 opacity-75" />
      ) : icon ? (
        <div className="mb-6 text-muted-foreground text-6xl">{icon}</div>
      ) : (
        <svg
          className="w-16 h-16 mb-6 text-muted-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
      )}
      <h3 className="text-xl font-semibold text-foreground mb-2 text-center">
        {title}
      </h3>
      <p className="text-muted-foreground text-center max-w-sm mb-6">
        {description}
      </p>
      {action && (
        <Button onClick={action.onClick} variant="primary">
          {action.label}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
