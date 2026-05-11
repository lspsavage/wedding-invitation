"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyLinkButtonProps {
  slug: string;
}

export default function CopyLinkButton({ slug }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const url = `${window.location.origin}/${slug}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Gagal menyalin link:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
        copied 
          ? "bg-green-100 text-green-700" 
          : "bg-gray-100 text-gray-600 hover:bg-brand-gold hover:text-white"
      }`}
      title="Salin Link Undangan"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          <span className="text-xs font-medium">Tersalin!</span>
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          <span className="text-xs font-medium">Salin Link</span>
        </>
      )}
    </button>
  );
}
