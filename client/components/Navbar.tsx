import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useWallet } from "../context/WalletContext";
import { useTheme } from "../context/ThemeContext";
import { formatAddress } from "../utils/helpers";
import Button from "./Button";

const Navbar: React.FC = () => {
  const { isConnected, address, connectWallet, disconnectWallet } = useWallet();
  const { isDark, toggleTheme } = useTheme();
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleWalletClick = async () => {
    if (isConnected) disconnectWallet();
    else await connectWallet();
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border" role="banner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center text-white font-bold">AG</div>
              <span className="sr-only">AlgoGreen home</span>
              <span className="font-bold text-lg hidden sm:inline">AlgoGreen</span>
            </Link>

            <div className="hidden md:flex items-center bg-muted rounded-lg px-3 py-1 gap-2">
              <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"/></svg>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects, credits, txns..."
                aria-label="Search projects, credits and transactions"
                className="bg-transparent outline-none text-sm w-72 focus:ring-0"
              />
            </div>
            {/* Mobile search - visible on small screens */}
            <div className="md:hidden ml-2">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                aria-label="Search"
                className="bg-muted/50 px-2 py-1 rounded text-sm w-36 focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <nav className="flex items-center gap-3" role="navigation" aria-label="Primary navigation">
            <div className="hidden sm:flex items-center gap-2">
              <Button onClick={toggleTheme} variant="ghost" aria-label="Toggle theme">{isDark ? "🌙" : "☀️"}</Button>
              <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">Dashboard</Link>
              <Link to="/credits" className="text-sm text-muted-foreground hover:text-foreground">Credits</Link>
            </div>

            <div className="flex items-center gap-3">
              <Button onClick={handleWalletClick} variant={isConnected ? "secondary" : "primary"} size="sm" className="whitespace-nowrap">
                {isConnected ? formatAddress(address || "") : "Connect Wallet"}
              </Button>
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-md md:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-controls="mobile-menu"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              title={menuOpen ? "Close menu" : "Open menu"}
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
          </nav>
        </div>

        {menuOpen && (
          <div id="mobile-menu" className="md:hidden mt-2 pb-4 border-t border-border">
            <div className="flex flex-col gap-2 px-2">
              <Link to="/dashboard" className="px-3 py-2 rounded hover:bg-muted/10">Dashboard</Link>
              <Link to="/mint" className="px-3 py-2 rounded hover:bg-muted/10">Mint</Link>
              <Link to="/credits" className="px-3 py-2 rounded hover:bg-muted/10">Credits</Link>
              <Link to="/trade" className="px-3 py-2 rounded hover:bg-muted/10">Trade</Link>
              <Link to="/verify" className="px-3 py-2 rounded hover:bg-muted/10">Verify</Link>
              <Button onClick={handleWalletClick} variant={isConnected ? "secondary" : "primary"} size="sm" className="w-full mt-2">{isConnected ? formatAddress(address || "") : "Connect Wallet"}</Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
