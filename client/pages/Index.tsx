import React from "react";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Large hero with prominent CTA and feature highlights */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-foreground">
              Transparent carbon credits, verifiable on Algorand
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
              Mint, verify and trade carbon credit NFTs with low fees and instant finality. Connect your wallet to get started or browse projects and marketplaces.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/dashboard" className="inline-flex items-center px-5 py-3 bg-primary text-white rounded-md shadow hover:bg-primary/90">Open Dashboard</Link>
              <Link to="/mint" className="inline-flex items-center px-5 py-3 border border-border rounded-md text-foreground hover:bg-muted">Mint Credits</Link>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-card rounded-lg">
                <h4 className="font-semibold">Fast & Low Cost</h4>
                <p className="text-sm text-muted-foreground mt-1">Algorand allows cheap, fast transactions for on-chain provenance.</p>
              </div>
              <div className="p-4 bg-card rounded-lg">
                <h4 className="font-semibold">Verified Metadata</h4>
                <p className="text-sm text-muted-foreground mt-1">Attach proofs and IPFS metadata to every credit.</p>
              </div>
              <div className="p-4 bg-card rounded-lg">
                <h4 className="font-semibold">Open Integrations</h4>
                <p className="text-sm text-muted-foreground mt-1">Connect wallets, indexers and audit tools.</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-gradient-to-br from-white to-slate-50 p-6 shadow-lg">
            <div className="text-sm text-muted-foreground">Live snapshot</div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="p-4 bg-card rounded">
                <div className="text-xs text-muted-foreground">Total Credits</div>
                <div className="text-2xl font-bold mt-1">24,512</div>
              </div>
              <div className="p-4 bg-card rounded">
                <div className="text-xs text-muted-foreground">Active Projects</div>
                <div className="text-2xl font-bold mt-1">86</div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-muted/50 rounded">
              <div className="text-xs text-muted-foreground">Recent activity</div>
              <ul className="mt-2 text-sm space-y-2">
                <li>📌 Project SolarFarm minted 120 MT (Asset 1002)</li>
                <li>🔁 25 MT transferred to wallet A…Y5HVY</li>
                <li>✅ Verified metadata published for Asset 1001</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 border-t border-border">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-2xl font-semibold">How it works</h3>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-card rounded-lg">
              <h4 className="font-semibold">1. Register Project</h4>
              <p className="text-sm text-muted-foreground mt-2">Add project details and supporting documentation to mint respected credits.</p>
            </div>
            <div className="p-6 bg-card rounded-lg">
              <h4 className="font-semibold">2. Mint Credits</h4>
              <p className="text-sm text-muted-foreground mt-2">Issue NFTs representing verified emission reductions.</p>
            </div>
            <div className="p-6 bg-card rounded-lg">
              <h4 className="font-semibold">3. Trade & Retire</h4>
              <p className="text-sm text-muted-foreground mt-2">Transfer between participants or retire credits for claims.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-10 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} AlgoGreen — Built for a greener future.
      </footer>
    </main>
  );
}
