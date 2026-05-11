"use client";

export const dynamic = "force-dynamic";

import { createInvitation } from "../actions";
import UploadWidget from "./UploadWidget";
import { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function CreateInvitationPage() {
  const [heroImageUrl, setHeroImageUrl] = useState("");

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/dashboard"
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </Link>
        <h1 className="text-3xl font-serif text-brand-charcoal">Buat Undangan Baru</h1>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
        <form action={createInvitation} className="space-y-6 font-sans">
          <input type="hidden" name="heroImageUrl" value={heroImageUrl} />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Nama Mempelai Pria</label>
              <input
                required
                name="groomName"
                placeholder="Contoh: Aris"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold/50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Nama Mempelai Wanita</label>
              <input
                required
                name="brideName"
                placeholder="Contoh: Sarah"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold/50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Slug URL (unique)</label>
            <div className="flex items-center">
              <span className="px-4 py-3 bg-gray-50 border border-r-0 border-gray-200 rounded-l-xl text-gray-500">
                wedding.com/
              </span>
              <input
                required
                name="slug"
                placeholder="aris-sarah"
                className="flex-1 px-4 py-3 rounded-r-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold/50"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Tanggal Pernikahan</label>
              <input
                required
                type="datetime-local"
                name="weddingDate"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold/50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Pilih Template</label>
              <select
                required
                name="templateId"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 bg-white"
              >
                <option value="1">Classic Elegant</option>
                <option value="2">Modern Floral (Coming Soon)</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Foto Hero</label>
            <UploadWidget onUpload={(url) => setHeroImageUrl(url)} />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-brand-gold text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-charcoal transition-all shadow-md active:scale-95"
            >
              <Save className="w-5 h-5" />
              Simpan Undangan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
