import "dotenv/config";
import { defineConfig } from "prisma/config";

// CLI-only credentials. No runtime DATABASE_URL fallback and no schema writes at build time.
// Undefined URLs allow offline validate/generate; connection commands require DIRECT_URL.
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: {
    url: process.env.DIRECT_URL || undefined,
    shadowDatabaseUrl: process.env.SHADOW_DATABASE_URL || undefined,
  },
});
