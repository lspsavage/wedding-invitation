import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./db/schema";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url) {
  throw new Error("TURSO_DATABASE_URL is not defined");
}

if (!authToken && url.startsWith("libsql://")) {
  throw new Error("TURSO_AUTH_TOKEN is not defined");
}

const client = createClient({
  url: url,
  authToken: authToken,
});

export const db = drizzle(client, { schema });
