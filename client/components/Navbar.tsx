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
  const [notifOpen, setNotifOpen] = useState(false);

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
    <header className="sticky top-0 z-50 bg-card/60 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white">AG</div>
              <span className="font-bold text-lg hidden sm:inline">AlgoGreen</span>
            </Link>

            <div className="hidden md:flex items-center bg-input rounded-lg px-3 py-1 gap-2">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"/></svg>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects, credits, txns..."
                className="bg-transparent outline-none text-sm w-80"
              />
            </div>
          </div>

          <nav className="flex items-center gap-3">
            <button onClick={() => setNotifOpen(!notifOpen)} aria-label="Notifications" className="p-2 rounded-md hover:bg-accent/10">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
            </button>

            <button onClick={toggleTheme} className="p-2 rounded-md hover:bg-accent/10" aria-label="Toggle theme">
              {isDark ? (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v2"/><path d="M12 19v2"/><path d="M4.2 4.2l1.4 1.4"/><path d="M18.4 18.4l1.4 1.4"/><circle cx="12" cy="12" r="4"/></svg>
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
              )}
            </button>

            <div className="hidden sm:block">
              <Button onClick={handleWalletClick} variant={isConnected ? "secondary" : "primary"} size="sm">
                {isConnected ? formatAddress(address || "") : "Connect Wallet"}
              </Button>
            </div>

            {/* Mobile menu */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded-md md:hidden">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
          </nav>
        </div>

        {/* Mobile expanded menu */}
        {menuOpen && (
          <div className="md:hidden mt-2 pb-4 border-t border-border">
            <div className="flex flex-col gap-2 px-2">
              <Link to="/dashboard" className="px-3 py-2 rounded">Dashboard</Link>
              <Link to="/mint" className="px-3 py-2 rounded">Mint</Link>
              <Link to="/credits" className="px-3 py-2 rounded">Credits</Link>
              <Link to="/trade" className="px-3 py-2 rounded">Trade</Link>
              <Link to="/verify" className="px-3 py-2 rounded">Verify</Link>
              <Button onClick={handleWalletClick} variant={isConnected ? "secondary" : "primary"} size="sm" className="w-full">{isConnected ? formatAddress(address || "") : "Connect Wallet"}</Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
