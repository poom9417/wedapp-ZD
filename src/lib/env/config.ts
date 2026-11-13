import "server-only";

export type Environment = Readonly<Record<string, string | undefined>>;
type ConfigKey = "APP_URL" | "APPWRITE_ENDPOINT" | "APPWRITE_PROJECT_ID" | "APPWRITE_API_KEY" | "DATABASE_URL";
export type Configuration<T> =
  | { status: "configured"; value: T }
  | { status: "not_configured"; fields: ConfigKey[] }
  | { status: "invalid_configuration"; fields: ConfigKey[] };

const value = (env: Environment, key: ConfigKey) => env[key]?.trim() || undefined;
const isLoopback = (host: string) => ["localhost", "127.0.0.1", "[::1]"].includes(host);

function webUrl(raw: string, env: Environment, endpoint: boolean): boolean {
  try {
    const url = new URL(raw);
    const secure = url.protocol === "https:";
    const local = env.NODE_ENV === "development" && url.protocol === "http:" && isLoopback(url.hostname);
    return (secure || local) && !url.username && !url.password && !url.search && !url.hash
      && (endpoint ? /\/v1\/?$/.test(url.pathname) : url.pathname === "/");
  } catch { return false; }
}

export function validateAppConfig(env: Environment): Configuration<{ appUrl?: string }> {
  const appUrl = value(env, "APP_URL");
  if (appUrl && !webUrl(appUrl, env, false)) {
    return { status: "invalid_configuration", fields: ["APP_URL"] };
  }
  return { status: "configured", value: { appUrl } };
}

export function validateAuthConfig(env: Environment): Configuration<{ endpoint: string; projectId: string; apiKey: string }> {
  const keys: ConfigKey[] = ["APPWRITE_ENDPOINT", "APPWRITE_PROJECT_ID", "APPWRITE_API_KEY"];
  const missing = keys.filter((key) => !value(env, key));
  if (missing.length) return { status: "not_configured", fields: missing };
  const endpoint = value(env, "APPWRITE_ENDPOINT")!;
  const projectId = value(env, "APPWRITE_PROJECT_ID")!;
  const apiKey = value(env, "APPWRITE_API_KEY")!;
  const invalid: ConfigKey[] = [];
  if (!webUrl(endpoint, env, true)) invalid.push("APPWRITE_ENDPOINT");
  if (!/^[A-Za-z0-9][A-Za-z0-9._-]{0,35}$/.test(projectId)) invalid.push("APPWRITE_PROJECT_ID");
  if (/\s/.test(apiKey)) invalid.push("APPWRITE_API_KEY");
  if (invalid.length) return { status: "invalid_configuration", fields: invalid };
  return { status: "configured", value: { endpoint, projectId, apiKey } };
}

export function validateDatabaseConfig(env: Environment): Configuration<{ connectionString: string }> {
  const connectionString = value(env, "DATABASE_URL");
  if (!connectionString) return { status: "not_configured", fields: ["DATABASE_URL"] };
  try {
    const url = new URL(connectionString);
    const tlsModes = url.searchParams.getAll("sslmode");
    const localDev = env.NODE_ENV === "development" && isLoopback(url.hostname);
    const valid = ["postgres:", "postgresql:"].includes(url.protocol)
      && Boolean(url.hostname && url.username && url.password && url.pathname.length > 1)
      && !url.hash
      && (localDev || (tlsModes.length === 1 && tlsModes[0] === "verify-full"));
    if (!valid) return { status: "invalid_configuration", fields: ["DATABASE_URL"] };
    return { status: "configured", value: { connectionString } };
  } catch {
    return { status: "invalid_configuration", fields: ["DATABASE_URL"] };
  }
}
