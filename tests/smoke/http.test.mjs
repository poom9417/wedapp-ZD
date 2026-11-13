import assert from "node:assert/strict";
import test from "node:test";

const base = new URL(process.env.SMOKE_BASE_URL || "http://127.0.0.1:3000");
if (!["127.0.0.1", "localhost", "[::1]"].includes(base.hostname) || base.username || base.password) {
  throw new Error("Smoke tests are restricted to a local server");
}

const request = (path) => fetch(new URL(path, base), { signal: AbortSignal.timeout(15000) });

test("Thai landing page renders honest disconnected states without a login form", async () => {
  const response = await request("/");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<html lang="th"/);
  assert.match(html, /wedapp-ZD/);
  assert.match(html, /ยังไม่ได้เชื่อม/);
  assert.match(html, /ยังไม่เปิดให้เข้าสู่ระบบ/);
  assert.doesNotMatch(html, /<form/);
});

test("live liveness endpoint follows its minimal contract", async () => {
  const response = await request("/api/health");
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.deepEqual(await response.json(), { status: "ok" });
});

test("live readiness reports pending integrations, not successful authentication", async () => {
  const response = await request("/api/ready");
  assert.equal(response.status, 503);
  assert.equal(response.headers.get("cache-control"), "no-store");
  const body = await response.json();
  assert.equal(body.status, "not_ready");
  assert.equal(body.error.code, "INTEGRATION_NOT_READY");
  assert.notEqual(body.checks.auth.status, "connected");
  assert.notEqual(body.checks.database.status, "connected");
});

test("liveness does not accept mutations", async () => {
  const response = await fetch(new URL("/api/health", base), { method: "POST", signal: AbortSignal.timeout(15000) });
  assert.equal(response.status, 405);
});
