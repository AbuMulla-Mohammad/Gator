import { defineConfig } from "drizzle-kit";
import {readConfig} from "./src/config"

const connectionString = readConfig().dbUrl;
export default defineConfig({
  schema: "src/lib/db/schema.ts",
  out: "src/lib/migrations/",
  dialect: "postgresql",
  dbCredentials: {
    url: connectionString,
  },
});