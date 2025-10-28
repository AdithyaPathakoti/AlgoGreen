import "./global.css";
// Polyfill Buffer for libraries (algosdk) that expect Node Buffer in the browser
import { Buffer } from "buffer";
if (!(window as any).Buffer) {
  (window as any).Buffer = Buffer;
}

import React, { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./context/ThemeContext";
import { WalletProvider } from "./context/WalletContext";
import { ToastProvider } from "./components/ToastNotification";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import LayoutWrapper from "./components/LayoutWrapper";

// Lazy load pages for improved startup
const Dashboard = lazy(() => import("./pages/Dashboard"));
const MintCredits = lazy(() => import("./pages/MintCredits"));
const MyCredits = lazy(() => import("./pages/MyCredits"));
const TradeCredits = lazy(() => import("./pages/TradeCredits"));
const VerifyCredits = lazy(() => import("./pages/VerifyCredits"));
const Profile = lazy(() => import("./pages/Profile"));
const Settings = lazy(() => import("./pages/Settings"));
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Index = lazy(() => import("./pages/Index"));

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false } },
});

function LoadingShell() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="text-center">
        <div className="animate-pulse h-12 w-12 rounded-full bg-green-300 mx-auto mb-4" />
        <h2 className="text-lg font-semibold text-slate-700">Starting UI...</h2>
        <p className="text-sm text-slate-500 mt-2">Preparing polished interface</p>
      </div>
    </div>
  );
}

const App: React.FC = () => (
  <ErrorBoundary>
    <ThemeProvider>
      <WalletProvider>
        <ToastProvider>
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <LayoutWrapper>
                  <Suspense fallback={<LoadingShell />}>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/mint" element={<MintCredits />} />
                      <Route path="/credits" element={<MyCredits />} />
                      <Route path="/trade" element={<TradeCredits />} />
                      <Route path="/verify" element={<VerifyCredits />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/about" element={<About />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </LayoutWrapper>
              </BrowserRouter>
            </TooltipProvider>
          </QueryClientProvider>
        </ToastProvider>
      </WalletProvider>
    </ThemeProvider>
  </ErrorBoundary>
);

createRoot(document.getElementById("root")!).render(<App />);
