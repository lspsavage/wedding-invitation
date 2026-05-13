import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { invitations } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { cache } from "react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

import ClassicElegant from "@/components/templates/ClassicElegant";

// Cached fetch function to avoid duplicate DB calls
const getInvitationData = cache(async (slug: string) => {
  if (!db) return null;
  
  return await db.query.invitations.findFirst({
    where: eq(invitations.slug, slug),
    with: {
      template: true,
    },
  });
});

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getInvitationData(slug);

  if (!data) {
    return {
      title: "Undangan Tidak Ditemukan",
    };
  }

  return {
    title: `The Wedding of ${data.groomName} & ${data.brideName}`,
    description: `You are invited to the wedding of ${data.groomName} & ${data.brideName}`,
  };
}

// Template Selector Registry
const TEMPLATE_REGISTRY: Record<number, React.ElementType> = {
  1: ClassicElegant,
  // 2: ModernTemplate, // add more templates here
};

export default async function InvitationPage({ params }: PageProps) {
  const { slug } = await params;
  
  // Fetch data (cached from generateMetadata)
  const data = await getInvitationData(slug);

  if (!data) {
    notFound();
  }

  // Select template dynamically
  const TemplateComponent = TEMPLATE_REGISTRY[data.templateId];

  // Fallback if template ID is not in registry
  if (!TemplateComponent) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-brand-cream text-brand-charcoal text-center">
        <div>
          <h1 className="text-3xl font-serif mb-4">Konfigurasi Template Tidak Ditemukan</h1>
          <p>Template dengan ID {data.templateId} belum tersedia di sistem.</p>
        </div>
      </div>
    );
  }

  // Render the selected template with the fetched data
  return (
    <>
      <TemplateComponent data={data} />
    </>
  );
}


