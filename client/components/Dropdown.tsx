import React, { useState, useRef, useEffect } from "react";

interface DropdownOption {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface DropdownProps {
  options: DropdownOption[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  placeholder?: string;
  label?: string;
  error?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  label,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // keyboard accessibility: open/close with Enter/Escape and navigate with Arrow keys
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!dropdownRef.current) return;
      const focused = document.activeElement;
      if (e.key === "Escape") setIsOpen(false);
      if (e.key === "Enter" && (focused === dropdownRef.current || dropdownRef.current.contains(focused))) {
        setIsOpen((s) => !s);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const handleSelect = (optionValue: string | number) => {
    onChange?.(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col gap-1.5" ref={dropdownRef}>
      {label && (
        <label className="text-sm font-medium text-foreground">{label}</label>
      )}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className={`w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 ${
            error ? "border-destructive focus:ring-destructive" : ""
          }`}
        >
          <span className="flex items-center gap-2">
            {selectedOption?.icon}
            {selectedOption?.label || placeholder}
          </span>
          <svg
            className={`w-5 h-5 transition-transform duration-200 ${
              isOpen ? "transform rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </button>

        {isOpen && (
          <div role="listbox" aria-label={label || "dropdown"} className="absolute top-full left-0 right-0 mt-1 bg-card border border-input rounded-lg shadow-lg z-50 animate-fade-in">
            {options.map((option, idx) => (
              <button
                key={option.value}
                role="option"
                aria-selected={option.value === value}
                onClick={() => handleSelect(option.value)}
                disabled={option.disabled}
                className={`w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-accent/10 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                  option.disabled ? "opacity-50 cursor-not-allowed" : ""
                } ${
                  option.value === value ? "bg-accent/20 text-primary" : ""
                }`}
              >
                {option.icon}
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
};

export default Dropdown;
