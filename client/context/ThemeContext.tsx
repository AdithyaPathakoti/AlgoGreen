import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDark, setIsDark] = useState(() => {
    try {
      if (typeof window === "undefined") return false;
      const stored = localStorage.getItem("theme");
      if (stored === "dark") return true;
      if (stored === "light") return false;
      return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    try {
      if (isDark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    } catch (e) {
      // ignore storage errors
    }
  }, [isDark]);

  useEffect(() => {
    // update if system changes (e.g., user toggles OS theme)
    const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
    const handler = (ev: MediaQueryListEvent) => setIsDark(ev.matches);
    if (mq && mq.addEventListener) mq.addEventListener("change", handler);
    return () => {
      if (mq && mq.removeEventListener) mq.removeEventListener("change", handler);
    };
  }, []);

  const toggleTheme = useMemo(() => {
    return () => setIsDark((prev) => !prev);
  }, []);

  const setTheme = (isDarkFlag: boolean) => {
    setIsDark(isDarkFlag);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
