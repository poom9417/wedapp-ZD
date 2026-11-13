import "server-only";
import { getAuthConfiguration } from "@/lib/auth/config";
import { getDatabaseConfiguration } from "@/lib/db/config";
import { validateAppConfig, type Configuration, type Environment } from "@/lib/env/config";

function integrationStatus(config: Configuration<unknown>) {
  // Presence/validity of credentials is never proof of a working integration.
  return config.status === "configured" ? "not_connected" : config.status;
}

export function getReadiness(env: Environment = process.env) {
  return {
    status: "not_ready",
    checks: {
      application: { status: validateAppConfig(env).status },
      auth: { status: integrationStatus(getAuthConfiguration(env)) },
      database: { status: integrationStatus(getDatabaseConfiguration(env)) },
    },
    error: {
      code: "INTEGRATION_NOT_READY",
      message: "ยังไม่ได้เชื่อมและทดสอบบริการยืนยันตัวตนและฐานข้อมูล",
    },
  } as const;
}
