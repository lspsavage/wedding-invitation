"use server";

import { db } from "@/lib/db";
import { invitations } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createInvitation(formData: FormData) {
  const brideName = formData.get("brideName") as string;
  const groomName = formData.get("groomName") as string;
  const weddingDate = new Date(formData.get("weddingDate") as string);
  const slug = formData.get("slug") as string;
  const templateId = parseInt(formData.get("templateId") as string);
  const heroImageUrl = formData.get("heroImageUrl") as string;

  await db.insert(invitations).values({
    brideName,
    groomName,
    weddingDate,
    slug,
    templateId,
    contentJson: {
      heroImageUrl,
      akad: {
        time: "08:00 - 10:00 WIB",
        location: "Masjid Agung",
      },
      resepsi: {
        time: "11:00 - 13:00 WIB",
        location: "Ballroom Utama",
      },
      mapsUrl: "",
    },
  });

  revalidatePath("/admin/dashboard");
  redirect("/admin/dashboard");
}

export async function deleteInvitation(id: number) {
  await db.delete(invitations).where(eq(invitations.id, id));
  revalidatePath("/admin/dashboard");
}
