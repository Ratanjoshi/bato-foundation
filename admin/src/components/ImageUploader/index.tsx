import { useRef, useState, useEffect } from "react";
import { UploadCloud, X, ImageIcon, Loader2 } from "lucide-react";
import { API_ORIGIN } from "../../api/client";

interface Props {
  value: File | null;
  onChange: (file: File | null) => void;
  existingUrl: string | null;
}

export default function ImageUploader({ value, onChange, existingUrl }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (value instanceof File) {
      const url = URL.createObjectURL(value);
      setPreviewUrl(url);
      setLoading(false);
      return () => URL.revokeObjectURL(url);
    }
    if (existingUrl) {
      const url = existingUrl.startsWith("http")
        ? existingUrl
        : `${API_ORIGIN}${existingUrl}`;
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
    setLoading(false);
  }, [value, existingUrl]);

  const handleFiles = (file: File | null | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file (JPEG, PNG, WEBP, AVIF).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be under 5 MB.");
      return;
    }
    onChange(file);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        Section Image <span className="text-red-500">*</span>
      </label>

      {previewUrl ? (
        <div className="relative group rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
          {loading ? (
            <div className="h-56 grid place-items-center">
              <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
            </div>
          ) : (
            <img
              src={previewUrl}
              alt="preview"
              className="w-full h-56 object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="px-4 py-2 bg-white text-slate-900 text-sm rounded-lg font-medium hover:bg-slate-100"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={() => onChange(null)}
              className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg font-medium hover:bg-red-700 inline-flex items-center gap-1"
            >
              <X className="h-4 w-4" /> Clear
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            handleFiles(e.dataTransfer.files?.[0]);
          }}
          className={`cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition ${
            dragOver
              ? "border-[#123a6b] bg-[#123a6b]/5"
              : "border-slate-300 hover:border-[#123a6b] hover:bg-slate-50"
          }`}
        >
          <div className="mx-auto h-12 w-12 rounded-full bg-[#123a6b]/10 flex items-center justify-center mb-3">
            <UploadCloud className="h-6 w-6 text-[#123a6b]" />
          </div>
          <p className="text-sm font-medium text-slate-700">
            Click to upload or drag &amp; drop
          </p>
          <p className="text-xs text-slate-500 mt-1">
            PNG, JPG, WEBP, AVIF · up to 5 MB
          </p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/avif"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files?.[0])}
      />

      {!previewUrl && (
        <p className="mt-2 text-xs text-slate-500 flex items-center gap-1.5">
          <ImageIcon className="h-3.5 w-3.5" />
          The uploaded image is stored on the server and used as the section
          background.
        </p>
      )}
    </div>
  );
}
