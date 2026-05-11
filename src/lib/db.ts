import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./db/schema";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

// Create client only if URL exists, otherwise use a placeholder to avoid build errors
const client = url 
  ? createClient({ url, authToken }) 
  : null;

export const db = client 
  ? drizzle(client, { schema }) 
  : (null as any); // Fallback for build time
