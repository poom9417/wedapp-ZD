# ADR 0002 — Local M0/M1 implementation
Date: 2026-11-13 (Asia/Bangkok)
Status: ACCEPTED for local foundation; hosted compatibility remains pending

- Keep the owner's Next.js + TypeScript + Appwrite Auth + native managed PostgreSQL + Prisma + Appwrite Sites architecture. No alternative database or remote writes.
- Pin Node 24.22.1 and the available pnpm 11.25.0. Appwrite publicly documents Node 24 for Sites; actual account/runtime/patch/package-manager availability must be verified before hosting.
- Next.js and eslint-config-next 16.4.6; React/react-dom 19.3.1. Use TypeScript 5.9.3 because typescript-eslint supports `<6.1.0`; registry latest TypeScript 7.0.2 is outside that peer range.
- Use Prisma/client/adapter-pg 7.10.1 consistently. Prisma 8 is a release candidate in current documentation/registry output; do not combine v8 examples with v7 config.
- Keep ESLint 9.39.4 temporarily: eslint-plugin-import 2.32.0, jsx-a11y 6.10.2 and react 7.37.5 reject 10.x in their peer ranges. ESLint 10.14.0 was tried, then reverted instead of forcing overrides. This is a known dev-tool maintenance limitation, not a claim of ongoing ESLint 9 support.
- Use system fonts without build-time font downloads. Keep the Thai landing page static and independent of cloud configuration.
- `/api/health` is liveness only; `/api/ready` returns 503 throughout M1. Well-formed configuration does not prove connectivity or permissions. No public detailed config values.
- Auth/DB modules are server-only configuration boundaries used by the readiness service. Defer SDK session clients, Prisma pools and protected operations to M2/M3 rather than introducing unused or fake access paths.
- Prisma schema has only generator/datasource. Validate/generate are local; no models, seeds, migration scripts, startup schema writes or build-time database connection.
- Runtime reads only DATABASE_URL. Prisma CLI reads only DIRECT_URL/SHADOW_DATABASE_URL without a runtime credential fallback. Remote URLs require verified TLS syntax, but actual CA/role/connection behavior is untested.
- Preserve imported policy and history; keep MANIFEST.json as original starter provenance. The Next.js managed guidance block appended to AGENTS.md does not supersede owner rules or authorize commits.

Evidence: COMPATIBILITY_AUDIT.md, package.json, pnpm-lock.yaml, handoffs/0001-m0-m1-foundation.md.
