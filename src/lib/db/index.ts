import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { readConfig } from "src/config";
import * as schema from "./schema";

const config = readConfig();
const conn = postgres(config.dbUrl);
export const db = drizzle(conn, { schema });

export async function closeDb() {
    await conn.end({ timeout: 5 });
}