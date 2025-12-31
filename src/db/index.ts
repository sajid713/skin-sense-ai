import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from "./schema";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
    throw new Error("Database is not configured")
}

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql, schema });
