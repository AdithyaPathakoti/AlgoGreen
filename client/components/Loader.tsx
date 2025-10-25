import React from "react";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  message?: string;
  fullScreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({
  size = "md",
  message,
  fullScreen = false,
}) => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  const spinner = (
    <svg
      className={`animate-spin ${sizeClasses[size]} text-primary`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-50">
        {spinner}
        {message && <p className="mt-4 text-foreground text-sm">{message}</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8">
      {spinner}
      {message && <p className="text-foreground text-sm">{message}</p>}
    </div>
  );
};

export default Loader;
