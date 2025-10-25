import "./global.css";
// Polyfill Buffer for libraries (algosdk) that expect Node Buffer in the browser
import { Buffer } from "buffer";
if (!(window as any).Buffer) {
  (window as any).Buffer = Buffer;
}

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { WalletProvider } from "./context/WalletContext";
import { ToastProvider } from "./components/ToastNotification";
import ErrorBoundary from "./components/ErrorBoundary";

// Pages
import Dashboard from "./pages/Dashboard";
import MintCredits from "./pages/MintCredits";
import MyCredits from "./pages/MyCredits";
import TradeCredits from "./pages/TradeCredits";
import VerifyCredits from "./pages/VerifyCredits";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <ThemeProvider>
      <WalletProvider>
        <ToastProvider>
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/mint" element={<MintCredits />} />
                  <Route path="/credits" element={<MyCredits />} />
                  <Route path="/trade" element={<TradeCredits />} />
                  <Route path="/verify" element={<VerifyCredits />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/about" element={<About />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </QueryClientProvider>
        </ToastProvider>
      </WalletProvider>
    </ThemeProvider>
  </ErrorBoundary>
);

createRoot(document.getElementById("root")!).render(<App />);
