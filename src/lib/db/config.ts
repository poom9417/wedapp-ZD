import "server-only";
import { validateDatabaseConfig, type Environment } from "@/lib/env/config";

// Config boundary only. M3 will initialize/reuse Prisma + adapter-pg after access policy review.
// DIRECT_URL and SHADOW_DATABASE_URL are intentionally not read by the runtime.
export function getDatabaseConfiguration(env: Environment = process.env) {
  return validateDatabaseConfig(env);
}
