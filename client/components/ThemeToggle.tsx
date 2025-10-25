import React from "react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="rounded-lg border border-border bg-card text-card-foreground p-6">
      <h3 className="font-semibold text-foreground mb-4">Theme</h3>

      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Choose your preferred color scheme
        </p>

        <div className="grid grid-cols-2 gap-4">
          {/* Light Mode */}
          <button
            onClick={() => !isDark && toggleTheme()}
            className={`p-4 rounded-lg border-2 transition-all ${
              !isDark
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary/50"
            }`}
          >
            <svg
              className="w-6 h-6 mx-auto mb-2 text-foreground"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.22 1.78a1 1 0 011.414 0l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 010-1.414zm2.828 2.828a1 1 0 011.414 0l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 010-1.414zM10 7a3 3 0 100 6 3 3 0 000-6zm-7 9a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm14 0a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm font-medium text-foreground">Light</p>
          </button>

          {/* Dark Mode */}
          <button
            onClick={() => isDark && toggleTheme()}
            className={`p-4 rounded-lg border-2 transition-all ${
              isDark
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary/50"
            }`}
          >
            <svg
              className="w-6 h-6 mx-auto mb-2 text-foreground"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
            <p className="text-sm font-medium text-foreground">Dark</p>
          </button>
        </div>

        {/* Current Selection */}
        <div className="p-3 rounded-lg bg-muted/50 border border-border">
          <p className="text-xs text-muted-foreground">Current theme</p>
          <p className="text-sm font-semibold text-foreground capitalize mt-1">
            {isDark ? "Dark Mode" : "Light Mode"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThemeToggle;
