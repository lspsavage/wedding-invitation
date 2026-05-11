import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { LayoutDashboard, PlusCircle, Home } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-charcoal text-white hidden md:flex flex-col">
        <div className="p-6">
          <h2 className="text-xl font-serif text-brand-gold">Wedding Admin</h2>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
          >
            <LayoutDashboard className="w-5 h-5 text-brand-gold" />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/admin/create"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
          >
            <PlusCircle className="w-5 h-5 text-brand-gold" />
            <span>Buat Undangan</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
          >
            <Home className="w-5 h-5 text-brand-gold" />
            <span>Lihat Site</span>
          </Link>
        </nav>
        <div className="p-6 border-t border-white/10 flex items-center justify-between">
          <span className="text-sm text-white/60">Akun Anda</span>
          <UserButton afterSignOutUrl="/" />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 md:hidden">
          <h2 className="text-xl font-serif text-brand-charcoal">Wedding Admin</h2>
          <UserButton afterSignOutUrl="/" />
        </header>
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
