import { db } from "@/lib/db";
import { invitations } from "@/lib/db/schema";
import { deleteInvitation } from "../actions";
import Link from "next/link";
import { Trash2, ExternalLink, Plus } from "lucide-react";
import CopyLinkButton from "./CopyLinkButton";

export default async function DashboardPage() {
  const allInvitations = await db.query.invitations.findMany({
    with: {
      template: true,
    },
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif text-brand-charcoal">Dashboard</h1>
          <p className="text-gray-500 mt-1">Kelola semua undangan pernikahan Anda.</p>
        </div>
        <Link
          href="/admin/create"
          className="bg-brand-gold text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-brand-charcoal transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Undangan Baru
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 font-sans text-sm font-semibold text-gray-700">Mempelai</th>
              <th className="px-6 py-4 font-sans text-sm font-semibold text-gray-700">Tanggal</th>
              <th className="px-6 py-4 font-sans text-sm font-semibold text-gray-700">Slug</th>
              <th className="px-6 py-4 font-sans text-sm font-semibold text-gray-700">Template</th>
              <th className="px-6 py-4 font-sans text-sm font-semibold text-gray-700 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 font-sans">
            {allInvitations.map((inv) => (
              <tr key={inv.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">
                    {inv.groomName} & {inv.brideName}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {new Date(inv.weddingDate).toLocaleDateString("id-ID")}
                </td>
                <td className="px-6 py-4 text-brand-gold font-medium">
                  /{inv.slug}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {inv.template.name}
                </td>
                <td className="px-6 py-4 text-right space-x-3">
                  <CopyLinkButton slug={inv.slug} />
                  <Link
                    href={`/${inv.slug}`}
                    target="_blank"
                    className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </Link>
                  <form action={deleteInvitation.bind(null, inv.id)} className="inline">
                    <button className="w-9 h-9 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-sm flex items-center justify-center">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {allInvitations.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  Belum ada undangan. Klik "Undangan Baru" untuk membuat.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
