import { sql, relations } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const templates = sqliteTable("templates", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  componentPath: text("component_path").notNull(),
});

export const templatesRelations = relations(templates, ({ many }) => ({
  invitations: many(invitations),
}));

export const invitations = sqliteTable("invitations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  brideName: text("bride_name").notNull(),
  groomName: text("groom_name").notNull(),
  weddingDate: integer("wedding_date", { mode: "timestamp" }).notNull(),
  contentJson: text("content_json", { mode: "json" }).notNull(),
  templateId: integer("template_id").references(() => templates.id).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
});

export const invitationsRelations = relations(invitations, ({ one }) => ({
  template: one(templates, {
    fields: [invitations.templateId],
    references: [templates.id],
  }),
}));

// TypeScript Inference for frontend usage
export type Template = typeof templates.$inferSelect;
export type NewTemplate = typeof templates.$inferInsert;

export type Invitation = typeof invitations.$inferSelect;
export type NewInvitation = typeof invitations.$inferInsert;

// Example of the expected JSON structure for content_json (optional, just for type safety hints)
export interface InvitationContentJson {
  location?: {
    lat: number;
    lng: number;
    address: string;
    mapUrl: string;
  };
  gallery?: string[]; // Array of Cloudinary URLs
  gifts?: {
    bankName: string;
    accountName: string;
    accountNumber: string;
  }[];
  rsvpMessage?: string;
  [key: string]: any; // Allow other dynamic fields
}
