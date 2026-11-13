import assert from "node:assert/strict";
import test from "node:test";
import { GET as health } from "../../src/app/api/health/route";
import { GET as readiness } from "../../src/app/api/ready/route";

test("liveness returns only status, is not cached, and performs no HTTP calls", async (context) => {
  const network = context.mock.method(globalThis, "fetch", () => {
    throw new Error("Unexpected network access in liveness");
  });
  const response = health();
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.deepEqual(await response.json(), { status: "ok" });
  assert.equal(network.mock.callCount(), 0);
});

test("readiness is 503 and no-store until real integrations are implemented and verified", async (context) => {
  const network = context.mock.method(globalThis, "fetch", () => {
    throw new Error("M1 readiness must not contact cloud services");
  });
  const response = readiness();
  assert.equal(response.status, 503);
  assert.equal(response.headers.get("cache-control"), "no-store");
  const body = await response.json();
  assert.equal(body.status, "not_ready");
  assert.equal(body.error.code, "INTEGRATION_NOT_READY");
  assert.equal(network.mock.callCount(), 0);
});
