import React, { useState } from "react";
import LayoutWrapper from "../components/LayoutWrapper";
import ThemeToggle from "../components/ThemeToggle";
import NetworkSelector from "../components/NetworkSelector";
import Button from "../components/Button";
import { useToast } from "../components/ToastNotification";

const Settings: React.FC = () => {
  const { addToast } = useToast();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);

  const handleSaveSettings = () => {
    addToast("Settings saved successfully", "success");
  };

  const handleResetSettings = () => {
    addToast("Settings reset to defaults", "info");
  };

  return (
    <LayoutWrapper>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your preferences and application settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Display Settings */}
            <div className="p-6 rounded-lg border border-border bg-card text-card-foreground">
              <h3 className="font-semibold text-foreground mb-6 text-lg">
                Display Settings
              </h3>

              {/* Theme Toggle (embedded) */}
              <ThemeToggle />
            </div>

            {/* Notifications */}
            <div className="p-6 rounded-lg border border-border bg-card text-card-foreground">
              <h3 className="font-semibold text-foreground mb-6 text-lg">
                Notifications
              </h3>

              <div className="space-y-4">
                {/* Push Notifications */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border">
                  <div>
                    <p className="font-medium text-foreground">
                      In-App Notifications
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Receive alerts for transactions and updates
                    </p>
                  </div>
                  <button
                    onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notificationsEnabled ? "bg-primary" : "bg-muted"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notificationsEnabled ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Email Notifications */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border">
                  <div>
                    <p className="font-medium text-foreground">
                      Email Notifications
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Send email alerts for important events
                    </p>
                  </div>
                  <button
                    onClick={() => setEmailNotifications(!emailNotifications)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      emailNotifications ? "bg-primary" : "bg-muted"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        emailNotifications ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Network Settings */}
            <div>
              <NetworkSelector />
            </div>

            {/* Danger Zone */}
            <div className="p-6 rounded-lg border border-red-200 bg-red-50 text-red-900">
              <h3 className="font-semibold mb-4">⚠️ Danger Zone</h3>

              <div className="space-y-3">
                <div>
                  <p className="font-medium mb-2">Clear Cache</p>
                  <p className="text-sm mb-3 text-red-800">
                    This will clear all locally stored data and cache
                  </p>
                  <Button variant="destructive" size="sm">
                    Clear Cache
                  </Button>
                </div>

                <div className="border-t border-red-200 pt-4">
                  <p className="font-medium mb-2">Reset All Settings</p>
                  <p className="text-sm mb-3 text-red-800">
                    Reset all settings to default values
                  </p>
                  <Button variant="destructive" size="sm">
                    Reset Settings
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* About App */}
            <div className="p-6 rounded-lg border border-border bg-muted/50">
              <h3 className="font-semibold text-foreground mb-3">About</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">App Version</p>
                  <p className="text-foreground font-medium">1.0.0</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Network</p>
                  <p className="text-foreground font-medium">Algorand</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Storage</p>
                  <p className="text-foreground font-medium">IPFS</p>
                </div>
              </div>
            </div>

            {/* Help & Support */}
            <div className="p-6 rounded-lg border border-border bg-card text-card-foreground">
              <h3 className="font-semibold text-foreground mb-4">
                Help & Support
              </h3>
              <div className="space-y-2">
                <a
                  href="#faq"
                  className="block px-3 py-2 text-sm text-primary hover:bg-accent/10 rounded transition-colors"
                >
                  FAQ
                </a>
                <a
                  href="#docs"
                  className="block px-3 py-2 text-sm text-primary hover:bg-accent/10 rounded transition-colors"
                >
                  Documentation
                </a>
                <a
                  href="#support"
                  className="block px-3 py-2 text-sm text-primary hover:bg-accent/10 rounded transition-colors"
                >
                  Contact Support
                </a>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                onClick={handleSaveSettings}
                variant="primary"
                className="w-full"
              >
                Save Settings
              </Button>
              <Button
                onClick={handleResetSettings}
                variant="ghost"
                className="w-full"
              >
                Reset to Defaults
              </Button>
            </div>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default Settings;
