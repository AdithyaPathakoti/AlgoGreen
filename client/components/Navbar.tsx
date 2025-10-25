import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useWallet } from "../context/WalletContext";
import { useTheme } from "../context/ThemeContext";
import { formatAddress } from "../utils/helpers";
import Button from "./Button";

const Navbar: React.FC = () => {
  const { isConnected, address, connectWallet, disconnectWallet } = useWallet();
  const { isDark, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleWalletClick = async () => {
    if (isConnected) {
      disconnectWallet();
    } else {
      try {
        await connectWallet();
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    }
  };

  return (
    <nav className="sticky top-0 z-40 border-b border-border bg-card text-card-foreground shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
              🌍
            </div>
            <span className="hidden sm:inline text-foreground">
              Carbon Credit
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/dashboard"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/mint"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Mint
            </Link>
            <Link
              to="/credits"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Credits
            </Link>
            <Link
              to="/trade"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Trade
            </Link>
            <Link
              to="/verify"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Verify
            </Link>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-accent/10 transition-colors text-foreground"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.22 1.78a1 1 0 011.414 0l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 010-1.414zm2.828 2.828a1 1 0 011.414 0l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 010-1.414zM10 7a3 3 0 100 6 3 3 0 000-6zm-7 9a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm14 0a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* Wallet Connection */}
            <Button
              onClick={handleWalletClick}
              variant={isConnected ? "secondary" : "primary"}
              size="sm"
              className="hidden sm:inline-flex"
            >
              {isConnected ? formatAddress(address || "") : "Connect Wallet"}
            </Button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-accent/10 transition-colors text-foreground"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-border pt-4">
            <Link
              to="/dashboard"
              className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-accent/10 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/mint"
              className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-accent/10 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Mint
            </Link>
            <Link
              to="/credits"
              className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-accent/10 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Credits
            </Link>
            <Link
              to="/trade"
              className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-accent/10 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Trade
            </Link>
            <Link
              to="/verify"
              className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-accent/10 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Verify
            </Link>
            <Button
              onClick={() => {
                handleWalletClick();
                setIsMenuOpen(false);
              }}
              variant={isConnected ? "secondary" : "primary"}
              size="sm"
              className="w-full"
            >
              {isConnected ? formatAddress(address || "") : "Connect Wallet"}
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
