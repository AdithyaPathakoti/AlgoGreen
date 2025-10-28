import React from "react";

export default function Index() {
  return (
    <div className="min-h-screen bg-hero-pattern bg-cover bg-center">
      {/* Hero: compact - no duplicate branding/logo so navbar remains the single source of truth */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Build and verify carbon credits on Algorand</h2>
        <p className="mt-3 text-base text-slate-600 max-w-2xl mx-auto">Fast transactions, low fees, and transparent provenance — start by connecting a wallet or exploring projects below.</p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <a className="btn-primary" href="/dashboard">Open Dashboard</a>
          <a className="btn-secondary" href="/about">About AlgoGreen</a>
        </div>
      </section>
      <section className="py-16 bg-gradient-to-b from-white/60 to-slate-50">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-card rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg">Fast & Low Cost</h3>
            <p className="mt-2 text-sm text-slate-600">Algorand transactions finalize quickly with minimal fees — ideal for high-volume carbon credit operations.</p>
          </div>

          <div className="p-6 bg-card rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg">Verify Provenance</h3>
            <p className="mt-2 text-sm text-slate-600">Store and verify metadata and proofs for each credit so buyers can trust the source and environmental impact.</p>
          </div>

          <div className="p-6 bg-card rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg">Integrations</h3>
            <p className="mt-2 text-sm text-slate-600">Connect wallets, sign transactions, and integrate with third-party auditing tools easily.</p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-semibold">Get started in three steps</h2>
          <ol className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <li className="p-6 bg-card rounded-lg">
              <strong className="block">1. Connect your wallet</strong>
              <span className="block mt-2 text-sm text-slate-600">Use any Algorand-compatible wallet to connect and interact securely.</span>
            </li>
            <li className="p-6 bg-card rounded-lg">
              <strong className="block">2. Explore projects</strong>
              <span className="block mt-2 text-sm text-slate-600">Discover verified projects and review their credit metadata.</span>
            </li>
            <li className="p-6 bg-card rounded-lg">
              <strong className="block">3. Mint or trade</strong>
              <span className="block mt-2 text-sm text-slate-600">Mint credits or trade them via the dedicated flows in the app.</span>
            </li>
          </ol>
        </div>
      </section>

      <footer className="py-12 border-t border-border">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} AlgoGreen — Built for a greener future.
        </div>
      </footer>
    </div>
  );
}
