import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border bg-card text-card-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-lg">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
                🌍
              </div>
              <span>Carbon Credit</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Track, mint, verify, and trade carbon credit NFTs on the Algorand
              blockchain.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Platform</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/dashboard" className="hover:text-primary transition">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/mint" className="hover:text-primary transition">
                  Mint Credits
                </Link>
              </li>
              <li>
                <Link to="/credits" className="hover:text-primary transition">
                  My Credits
                </Link>
              </li>
              <li>
                <Link to="/trade" className="hover:text-primary transition">
                  Trade
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/verify" className="hover:text-primary transition">
                  Verify
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition">
                  About
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-primary transition">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/settings" className="hover:text-primary transition">
                  Settings
                </Link>
              </li>
            </ul>
          </div>

          {/* External Links */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">External</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://algorand.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition"
                >
                  Algorand
                </a>
              </li>
              <li>
                <a
                  href="https://www.builder.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition"
                >
                  Builder.io
                </a>
              </li>
              <li>
                <a
                  href="https://ipfs.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition"
                >
                  IPFS
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          {/* Bottom Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              © {new Date().getFullYear()} Carbon Credit Tracker. All rights
              reserved.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#privacy"
                className="text-sm text-muted-foreground hover:text-primary transition"
              >
                Privacy Policy
              </a>
              <a
                href="#terms"
                className="text-sm text-muted-foreground hover:text-primary transition"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
