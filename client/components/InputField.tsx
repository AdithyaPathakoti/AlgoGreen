import React from "react";

interface InputFieldProps {
  label?: string;
  error?: string;
  icon?: React.ReactNode; // leading icon
  trailingIcon?: React.ReactNode; // trailing icon (e.g., unit indicator)
  helperText?: string;
  multiline?: boolean;
  rows?: number;
  [key: string]: any;
}

const InputField = React.forwardRef<any, InputFieldProps>(
  (
    {
      label,
      error,
      icon,
      trailingIcon,
      helperText,
      className = "",
      multiline = false,
      rows = 3,
      ...props
    },
    ref
  ) => {
  const baseClasses = `w-full px-4 py-2 ${icon ? "pl-10" : ""} border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 ${error ? "border-destructive focus:ring-destructive" : ""} disabled:opacity-50 disabled:cursor-not-allowed ${className}`;
  const textareaClasses = baseClasses + " resize-vertical min-h-[96px]";

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-medium text-foreground">
            {label}
            {props.required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              {icon}
            </div>
          )}

          {multiline ? (
            <textarea
              ref={ref}
              rows={rows}
              className={textareaClasses}
              aria-invalid={!!error}
              {...(props as any)}
            />
          ) : (
            <input
              ref={ref}
              className={baseClasses}
              aria-invalid={!!error}
              {...(props as any)}
            />
          )}

          {trailingIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              {trailingIcon}
            </div>
          )}
        </div>
        {error && <p className="text-xs text-destructive" role="alert">{error}</p>}
        {helperText && !error && (
          <p className="text-xs text-muted-foreground">{helperText}</p>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
