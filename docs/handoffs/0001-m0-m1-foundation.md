# Handoff: M0/M1 local foundation
Timestamp/timezone: 2026-11-13, Asia/Bangkok (+07:00); final checks 08:48–08:49.
Author: Codex, implementation owner. Next owner: Claude, independent reviewer.
Goal: import starter without data loss, audit compatibility, deliver local Thai shell/liveness/tooling with honest external-service status.

## Revision and review artifact
- Repository: `D:\Github\wedapp-ZD`
- Branch: `codex/m0-m1-foundation`
- Base: `b4ee3297fdcf7be8555c61a9e635b256ca92e0d8` (Initial commit)
- No new commit; all work remains uncommitted. No Git remote configured.
- Review patch: `D:\Github\wedapp-ZD\.local\m0-m1-foundation.patch` (ignored local artifact).
- `git diff HEAD` / `git diff --stat HEAD` show imported and newly authored files after intent-to-add registration. No file content is staged for commit.
- Original `.gitattributes` unchanged. Original starter MANIFEST.json preserved as provenance, not as current application hashes.
- A final SHA-256 inventory in `.local/review-manifest.json` identifies the exact working files corresponding to the patch; do not review a later changed tree as this revision.

## Files and behavior
- Imported 25 starter files after checking manifest hashes, from `C:\Users\027707\Downloads\wedapp-ZD-starter\wedapp-ZD-starter`. No filenames collided.
- `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`, `.npmrc`, `.node-version`, `tsconfig.json`, `next-env.d.ts`, `next.config.ts`, `eslint.config.mjs`: pinned dependencies/runtime and local tooling.
- `src/app/layout.tsx`, `page.tsx`, `globals.css`: Thai semantic landing page, system fonts, responsive cards, keyboard skip-link, explicit disconnected Auth/DB states. No login form or business feature.
- `src/app/api/health/route.ts`: dependency-free GET liveness, 200 with only `{status:"ok"}`, no-store; POST 405.
- `src/app/api/ready/route.ts`, `src/services/readiness.ts`: 503, safe config-status projection, no cloud probes. Configured-looking values still map to `not_connected`.
- `src/lib/env/config.ts`, `src/lib/auth/config.ts`, `src/lib/db/config.ts`: server-only validators, missing/invalid config isolated from shell; runtime never reads DIRECT_URL/SHADOW_DATABASE_URL.
- `prisma.config.ts`, `prisma/schema.prisma`: Prisma 7 generator/datasource, no models/migrations/seeds; CLI credentials separate, no build/request schema writes.
- `tests/unit/config.test.ts`, `tests/unit/health.test.ts`, `tests/smoke/http.test.mjs`: 10 behavioral unit tests and 4 HTTP smoke tests (local hosts only).
- Updated README, PROJECT_STATE, TASKS, CHANGELOG, SYSTEM_ARCHITECTURE, API_CONTRACT, TEST_PLAN, DEPLOYMENT, COMPATIBILITY_AUDIT; added registry evidence and ADR 0002.
- `.gitignore` merged with generated Prisma output, pnpm cache and `.local` exclusions. Next dev appended only its marked documentation block to AGENTS.md; starter rules remain intact.

## Actual commands and outcomes
All commands executed in the real Windows workspace. Seven template variables were checked for presence only and were all unset; only .env.example exists.

| Time (+07:00, 2026-11-13) | Command | Outcome |
|---|---|---|
| 08:48:12 | pnpm install --frozen-lockfile | PASS, exit 0; lockfile accepted, already up to date |
| 08:48:13 | pnpm peers check | PASS, exit 0; no peer dependency issues |
| 08:48:13 | pnpm typecheck | PASS, exit 0; next typegen + tsc |
| 08:48:15 | pnpm lint | PASS, exit 0; no warnings/errors |
| 08:48:16 | pnpm test | PASS, exit 0; 10 tests |
| 08:48:17 | pnpm build | PASS, exit 0; static `/`, dynamic `/api/health` and `/api/ready` |
| 08:49:48 | pnpm db:validate | PASS, exit 0; empty PostgreSQL foundation schema valid, no DB call |
| 08:49:49 | pnpm db:generate | PASS, exit 0; Prisma 7.10.1 client generated into ignored src/generated/prisma |
| 08:49:50 | pnpm test:smoke with SMOKE_BASE_URL=http://127.0.0.1:3001 | PASS, exit 0; 4/4 against pnpm start --port 3001 |
| 08:49:50 | pnpm test:smoke | PASS, exit 0; 4/4 against pnpm dev on 3000 |

Raw structured local check timestamps/exit codes: `.local/verification.json` (no credentials).
`pnpm dev` and `pnpm start --port 3001` both reached Ready. Servers are local-loopback only.
Browser UI inspection: default desktop and 390px width, readable Thai without clipped combining marks; content width 375 <= viewport 390. Tab revealed visible skip-link focus; Enter then Tab reached the main health action. System font stack used; no downloaded font.
Raw JSON navigation was verified by automated HTTP tests; the in-app browser did not visibly navigate to JSON on click, so browser JSON navigation itself is not claimed as passed.

## Failures encountered and recovery
- Initial sandbox Git branch write denied; scoped escalation succeeded. No reset/clean/commit/push.
- Initial sandbox registry socket access denied; approved public registry reads succeeded.
- Initial lint found plain anchor navigation to `/`; changed only brand anchor to Next Link, then lint passed.
- Sandbox tsx failed `uv_os_get_passwd ENOMEM`; approved checks outside sandbox passed. No OS security setting changed.
- One initial unit assertion accidentally matched the fixture word `invalid` inside status `invalid_configuration`; corrected to assert the exact safe response, then all tests passed.
- ESLint 9 install reports deprecated. Trial 10.14.0 exposed peer mismatches with the three Next plugins; reverted to compatible 9.39.4 and final peer check passed. Maintenance still open.
- Prisma Node engine download failed ECONNRESET even outside sandbox. Official PowerShell HTTPS download worked. The first checksum comparison treated response bytes as text and failed closed; decoding UTF-8 produced matching hashes. Verified archive and decompressed binary independently before using either executable.
- Engine source: `https://binaries.prisma.sh/all_commits/d1b3f377ca835d73fd50954a5e22128b9ebdd6b8/windows/schema-engine.exe.gz`, with `.gz.sha256` and binary `.sha256` from the same official origin.
- Used PRISMA_SCHEMA_ENGINE_BINARY for initial local validation, then copied the verified engine to the installed engines package cache (`schema-engine-windows.exe`). Default db:validate/db:generate now pass. No TLS bypass, fake URL, remote DB or mutation used. Clean installs on another machine still require normal package/engine network access.
- First browser tab attach timed out; documented CUA createBrowserTab fallback succeeded.

## Test doubles and real integrations
Unit fixtures are synthetic (`.invalid` hosts, explicit synthetic keys/passwords). The only mocked function is fetch in the liveness/readiness tests, which throws if called. This proves those tested paths do not perform HTTP calls; it is not an Appwrite or DB integration test.

NOT RUN / BLOCKED:
- Real Appwrite Auth login/logout, cookies/CSRF/rate limits/session expiry/revocation/isolation: M2 not implemented; dev project/provider and credentials absent.
- Native PostgreSQL connection/TLS/CA/pooler/SQL privileges, authorization, mappings, migrations/shadow isolation: M3 not implemented; credentials/policy absent.
- Appwrite Sites account runtime/patch, pnpm/build/start settings, deployment: **pending hosting compatibility**; no target account or deploy scope.
- Full cross-browser, accessibility, load, security/dependency-vulnerability audit and independent Claude review: NOT RUN. Basic visual/keyboard inspection is not a conformance claim.

## Decisions, scope and next exact action
Target stack unchanged. Exact pins and rationale are in COMPATIBILITY_AUDIT.md and ADR 0002. No login/DB client is instantiated in M1; only validation boundaries are used. No models were invented to make generation pass.
Owner authorized local inspection/import/code/dependencies/tests. This turn did not authorize or perform commits, pushes, deployment, remote database mutation, paid resources or messages to other people/agents.

1. Reviewer checks this exact uncommitted patch against AGENTS.md and the tests, especially readiness semantics and server-only boundaries.
2. Resolve any review findings. Track deprecated ESLint 9 until Next plugin peers support a maintained version.
3. For M2, confirm development Appwrite project/region/endpoint and enabled Auth provider; place credentials only in ignored local env. Implement verified sessions, rate limiting and CSRF policy before any protected data path.
4. M3 additionally needs actual Native Managed PostgreSQL credentials/roles/TLS/pooler and identity/permission decisions. Never swap to TablesDB or another database silently.
