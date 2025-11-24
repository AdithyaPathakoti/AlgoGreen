import React, { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  closeButton?: boolean;
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
  closeButton = true,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Focus trap and keyboard handling
  useEffect(() => {
    if (!isOpen) return;

    const root = document.getElementById("modal-root") || document.body;
    const focusable = root.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
      if (e.key === "Tab") {
        // simple trap: keep focus inside modal
        const elements = Array.from(focusable).filter(Boolean) as HTMLElement[];
        if (elements.length === 0) return;
        const idx = elements.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && idx === 0) {
          e.preventDefault();
          elements[elements.length - 1].focus();
        } else if (!e.shiftKey && idx === elements.length - 1) {
          e.preventDefault();
          elements[0].focus();
        }
      }
    }

    document.addEventListener("keydown", onKey);
    // focus the first focusable item in the modal
    setTimeout(() => first?.focus(), 0);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 animate-fade-in"
        onClick={onClose}
      />
      <div
        className={`relative bg-card text-card-foreground rounded-lg shadow-lg w-full mx-4 ${sizeClasses[size]} animate-slide-up`}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || closeButton) && (
          <div className="flex items-center justify-between p-6 border-b border-border">
            {title && <h2 className="text-lg font-semibold">{title}</h2>}
            {closeButton && (
              <button
                onClick={onClose}
                className="ml-auto text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close modal"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        )}
        <div className="p-6">{children}</div>
        {footer && (
          <div className="flex items-center gap-3 p-6 border-t border-border">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
