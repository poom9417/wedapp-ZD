import "server-only";
import { validateAuthConfig, type Environment } from "@/lib/env/config";

// Config boundary only. M2 must create a new SDK session client per request.
export function getAuthConfiguration(env: Environment = process.env) {
  return validateAuthConfig(env);
}
