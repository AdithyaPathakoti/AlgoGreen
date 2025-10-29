import React, { useRef } from "react";

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSize?: number;
  label?: string;
  helperText?: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onFileSelect,
  accept = ".pdf,.png,.jpg,.jpeg",
  maxSize = 10485760,
  label = "Upload Certificate",
  helperText = "Drag and drop or click to select",
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleFile = (file: File) => {
    setError("");

    if (file.size > maxSize) {
      setError(`File size must be less than ${maxSize / 1024 / 1024}MB`);
      return;
    }

    onFileSelect(file);
  };

  // Show a simple preview for image files
  const filePreview = React.useMemo(() => {
    if (!fileInputRef.current || !fileInputRef.current.files) return null;
    const f = fileInputRef.current.files[0];
    if (!f) return null;
    if (f.type.startsWith("image/")) return URL.createObjectURL(f);
    return null;
  }, [fileInputRef.current?.files]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-foreground">{label}</label>
      )}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200 ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50"
        } ${error ? "border-destructive bg-destructive/5" : ""}`}
      >
        <svg
          className="w-12 h-12 mx-auto mb-3 text-muted-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        <p className="text-sm font-medium text-foreground">{helperText}</p>
        <p className="text-xs text-muted-foreground mt-1">
          {accept} • Max {maxSize / 1024 / 1024}MB
        </p>

        {/* Inline preview for selected images */}
        {filePreview && (
          <div className="mt-3">
            <img src={filePreview} alt="preview" className="mx-auto max-h-32 rounded" />
            <p className="text-xs text-muted-foreground mt-2">Preview of the selected file</p>
          </div>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleInputChange}
        className="hidden"
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
};

export default FileUploader;
