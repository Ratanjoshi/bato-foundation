import { useRef, useState } from "react";
import { UploadCloud, X } from "lucide-react";
import { cn } from "../../lib/utils";

interface Props {
  label?: string;
  hint?: string;
  preview: string | null;
  onChange: (file: File | null, previewUrl: string | null) => void;
  className?: string;
}

export default function ImageUploadField({
  label = "Image",
  hint = "PNG, JPG, or WEBP — max 5MB",
  preview,
  onChange,
  className,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handle = (file?: File | null) => {
    setError(null);
    if (!file) return onChange(null, null);

    if (!/^image\/(png|jpe?g|webp)$/i.test(file.type)) {
      setError("Only PNG, JPG, or WEBP allowed");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("File too large (max 5MB)");
      return;
    }
    onChange(file, URL.createObjectURL(file));
  };

  return (
    <div className={className}>
      <label className="mb-1.5 block text-sm font-medium text-gray-700">
        {label}
      </label>

      {preview ? (
        <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
          <img
            src={preview}
            alt="preview"
            className="h-64 w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/50 opacity-0 transition group-hover:opacity-100">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={() => handle(null)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-rose-500 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-600"
            >
              <X className="h-4 w-4" /> Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            handle(e.dataTransfer.files?.[0]);
          }}
          onClick={() => inputRef.current?.click()}
          className={cn(
            "cursor-pointer rounded-xl border-2 border-dashed p-10 text-center transition",
            dragOver
              ? "border-primaryColor bg-primaryColor/5"
              : "border-gray-300 hover:border-primaryColor/60 hover:bg-gray-50",
          )}
        >
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primaryColor/10">
              <UploadCloud className="h-6 w-6 text-primaryColor" />
            </div>
            <p className="text-sm font-medium text-gray-700">
              Click to upload or drag & drop
            </p>
            <p className="text-xs text-gray-500">{hint}</p>
          </div>
        </div>
      )}

      {error && (
        <p className="mt-2 text-xs font-medium text-rose-600">{error}</p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        hidden
        onChange={(e) => handle(e.target.files?.[0])}
      />
    </div>
  );
}
