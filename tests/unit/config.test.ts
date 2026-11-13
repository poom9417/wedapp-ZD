import assert from "node:assert/strict";
import test from "node:test";
import { validateAppConfig, validateAuthConfig, validateDatabaseConfig } from "../../src/lib/env/config";
import { getReadiness } from "../../src/services/readiness";

// Synthetic configuration fixtures only; no live keys, sessions or database connections.
const auth = {
  APPWRITE_ENDPOINT: "https://auth.example.invalid/v1",
  APPWRITE_PROJECT_ID: "synthetic-project",
  APPWRITE_API_KEY: "synthetic-test-key",
};
const databaseUrl = "postgresql://runtime:synthetic-password@db.example.invalid/app?sslmode=verify-full";

test("empty cloud configuration allows the app shell and identifies missing integrations", () => {
  assert.equal(validateAppConfig({}).status, "configured");
  assert.equal(validateAuthConfig({}).status, "not_configured");
  assert.equal(validateDatabaseConfig({}).status, "not_configured");
  assert.deepEqual(getReadiness({}).checks, {
    application: { status: "configured" },
    auth: { status: "not_configured" },
    database: { status: "not_configured" },
  });
});

test("partial and whitespace-only auth configuration fails closed without echoing values", () => {
  const result = validateAuthConfig({ ...auth, APPWRITE_PROJECT_ID: " ", APPWRITE_API_KEY: "" });
  assert.equal(result.status, "not_configured");
  assert.ok(!JSON.stringify(result).includes(auth.APPWRITE_ENDPOINT));
});

test("rejects unsafe auth endpoints and malformed project IDs", () => {
  for (const endpoint of ["not-a-url", "http://auth.example.invalid/v1", "https://user:password@auth.example.invalid/v1", "https://auth.example.invalid", "https://auth.example.invalid/v1?key=secret"]) {
    assert.equal(validateAuthConfig({ ...auth, APPWRITE_ENDPOINT: endpoint }).status, "invalid_configuration");
  }
  assert.equal(validateAuthConfig({ ...auth, APPWRITE_PROJECT_ID: "browser supplied role" }).status, "invalid_configuration");
});

test("local HTTP exception is limited to development and loopback", () => {
  const local = { ...auth, APPWRITE_ENDPOINT: "http://localhost/v1" };
  assert.equal(validateAuthConfig({ ...local, NODE_ENV: "development" }).status, "configured");
  for (const NODE_ENV of ["production", "test", undefined]) {
    assert.equal(validateAuthConfig({ ...local, NODE_ENV }).status, "invalid_configuration");
  }
  assert.equal(validateAppConfig({ APP_URL: "http://127.0.0.1:3000", NODE_ENV: "development" }).status, "configured");
  assert.equal(validateAppConfig({ APP_URL: "http://127.0.0.1:3000", NODE_ENV: "production" }).status, "invalid_configuration");
  assert.equal(validateAppConfig({ APP_URL: "https://app.example.invalid/path" }).status, "invalid_configuration");
});

test("database validation rejects non-PostgreSQL, incomplete and insecure remote URLs", () => {
  for (const DATABASE_URL of ["invalid", "mysql://user:pass@db.example.invalid/app", "postgres://db.example.invalid/app?sslmode=verify-full", "postgres://user:pass@db.example.invalid/?sslmode=verify-full", "postgres://user:pass@db.example.invalid/app", "postgres://user:pass@db.example.invalid/app?sslmode=disable", "postgres://user:pass@db.example.invalid/app?sslmode=no-verify", "postgres://user:pass@db.example.invalid/app?sslmode=verify-full&sslmode=disable"]) {
    const result = validateDatabaseConfig({ DATABASE_URL });
    assert.deepEqual(result, { status: "invalid_configuration", fields: ["DATABASE_URL"] });
  }
  assert.equal(validateDatabaseConfig({ DATABASE_URL: databaseUrl }).status, "configured");
});

test("runtime never substitutes privileged migration credentials", () => {
  assert.equal(validateDatabaseConfig({ DIRECT_URL: databaseUrl, SHADOW_DATABASE_URL: databaseUrl }).status, "not_configured");
});

test("valid-looking credentials remain not connected and readiness never exposes values", () => {
  const readiness = getReadiness({ ...auth, DATABASE_URL: databaseUrl, APP_URL: "https://app.example.invalid" });
  assert.equal(readiness.status, "not_ready");
  assert.equal(readiness.checks.auth.status, "not_connected");
  assert.equal(readiness.checks.database.status, "not_connected");
  for (const value of [...Object.values(auth), databaseUrl, "synthetic-password", "app.example.invalid"]) {
    assert.ok(!JSON.stringify(readiness).includes(value));
  }
});

test("invalid cloud settings are isolated from app-shell configuration", () => {
  const env = { ...auth, APPWRITE_ENDPOINT: "broken", DATABASE_URL: "broken" };
  assert.equal(validateAppConfig(env).status, "configured");
  assert.equal(getReadiness(env).checks.auth.status, "invalid_configuration");
  assert.equal(getReadiness(env).checks.database.status, "invalid_configuration");
});
