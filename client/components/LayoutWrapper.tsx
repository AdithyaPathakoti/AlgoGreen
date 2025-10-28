import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      <div className="flex flex-1 w-full">
        {/* Sidebar */}
        <aside className="hidden lg:block w-72 border-r border-sidebar-border bg-sidebar-background p-4">
          <div className="flex flex-col gap-4 sticky top-20">
            <div className="px-2 py-3 rounded-lg bg-gradient-to-r from-green-50 to-transparent">
              <h4 className="font-semibold">Quick Actions</h4>
              <p className="text-xs text-slate-500 mt-1">Mint, verify and manage credits</p>
            </div>

            <nav className="flex flex-col gap-2">
              <a href="/dashboard" className="px-3 py-2 rounded hover:bg-sidebar-accent/10">Dashboard</a>
              <a href="/mint" className="px-3 py-2 rounded hover:bg-sidebar-accent/10">Mint Credits</a>
              <a href="/credits" className="px-3 py-2 rounded hover:bg-sidebar-accent/10">My Credits</a>
              <a href="/trade" className="px-3 py-2 rounded hover:bg-sidebar-accent/10">Trade</a>
              <a href="/verify" className="px-3 py-2 rounded hover:bg-sidebar-accent/10">Verify</a>
            </nav>
          </div>
        </aside>

        {/* Main content area */}
        <main className="flex-1 max-w-full mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default LayoutWrapper;
