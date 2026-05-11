"use client";

import { CldUploadWidget } from "next-cloudinary";
import { Image as ImageIcon, CheckCircle } from "lucide-react";
import { useState } from "react";

interface UploadWidgetProps {
  onUpload: (url: string) => void;
}

export default function UploadWidget({ onUpload }: UploadWidgetProps) {
  const [isUploaded, setIsUploaded] = useState(false);

  return (
    <CldUploadWidget
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
      onSuccess={(result: any) => {
        onUpload(result.info.secure_url);
        setIsUploaded(true);
      }}
    >
      {({ open }) => {
        return (
          <button
            type="button"
            onClick={() => open()}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-dashed transition-all w-full justify-center ${
              isUploaded
                ? "border-green-500 bg-green-50 text-green-700"
                : "border-gray-300 hover:border-brand-gold text-gray-600 hover:bg-brand-gold/5"
            }`}
          >
            {isUploaded ? (
              <>
                <CheckCircle className="w-5 h-5" />
                Foto Berhasil Diupload
              </>
            ) : (
              <>
                <ImageIcon className="w-5 h-5" />
                Upload Foto Hero
              </>
            )}
          </button>
        );
      }}
    </CldUploadWidget>
  );
}
