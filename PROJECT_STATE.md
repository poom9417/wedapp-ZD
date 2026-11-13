# Project state
Updated: 2026-11-13 (Asia/Bangkok)

## สถานะที่ยืนยันแล้ว
- ยืนยัน workspace จริง `D:\Github\wedapp-ZD` บน Windows; ก่อนทำงานมี `.gitattributes` และ Git clean บน main
- นำเข้า starter 25 ไฟล์จาก Downloads โฟลเดอร์ซ้อน ตรวจ manifest hashes ผ่าน ไม่มีชื่อซ้ำ และเก็บไฟล์เดิมครบ
- ตรวจ official docs + npm registry แล้ว pin exact dependencies และ pnpm-lock.yaml; ดู docs/COMPATIBILITY_AUDIT.md
- สร้างหน้าไทย, `/api/health` 200 และ `/api/ready` 503, server-only config/service boundaries และ Prisma 7 schema ไม่มี models
- ติดตั้งซ้ำจาก lockfile, typecheck, lint, unit tests 10/10 และ production build ผ่าน
- Prisma validate/generate ผ่านหลังแก้ engine download ด้วยไฟล์ทางการที่ตรวจ SHA-256; ไม่มี DB connection/migration
- HTTP smoke ผ่าน 4/4 บน dev และ 4/4 บน production start; browser แสดงภาษาไทยได้ที่จอปกติและ 390px และ keyboard skip-link ทำงาน
- ยังไม่มี login/protected data/business module และยังไม่ได้ทดสอบ real integration ใด
- ไม่มี Git remote ที่ตั้งไว้ ไม่ได้เชื่อม GitHub/Appwrite, push, deploy หรือสร้างทรัพยากร

## Current work
Task: M0/M1 local foundation implemented; ready for independent review
Implementation owner: Codex
Reviewer: Claude
Requirements/acceptance support: ChatGPT
Branch: codex/m0-m1-foundation
Base commit: b4ee3297fdcf7be8555c61a9e635b256ca92e0d8 (Initial commit)
Working tree: uncommitted foundation + imported documents; no new commit
Review artifact: `.local/m0-m1-foundation.patch` and `docs/handoffs/0001-m0-m1-foundation.md`
Use `git diff HEAD` / `git diff --stat HEAD` after intent-to-add registration; no file content is staged for commit.

## Constraints and blockers
- Local: Node 24.22.1, pnpm 11.25.0, Git 2.55.0.windows.5; npm not in PATH; Codex CLI 0.153.4; Claude/Docker not found (optional)
- ESLint 9.39.4 deprecated; Next plugins reject ESLint 10 peers. Compatible tooling retained without forced overrides; maintenance follow-up required
- Prisma Node downloader hit ECONNRESET; verified engine cached in node_modules for this machine. Fresh machines may need normal network access to binaries.prisma.sh
- Appwrite Sites Node 24 documented publicly, but actual account/site runtime and package-manager support: **pending hosting compatibility**, not deploy-ready
- Appwrite project ID/region/database availability: unverified in user's account
- Auth provider/credentials: not supplied
- Business workflows/roles: undefined
Credentials ไม่ขวาง M0/M1 ที่ทำสำเร็จแล้ว; integration จริงและ business modules ยังไม่ได้ทำ
Next.js appended its marked agent-documentation guidance to AGENTS.md; original starter rules remain intact.

## Authorization
Initial: local inspection, starter import, local scaffolding/dependency installation and tests.
Remote writes/push/deployment/paid resources/database mutations: not included.
Record later owner authorizations here with target and scope.

## Next action
Claude ตรวจ diff และผลทดสอบตาม handoff โดยไม่ถือว่า summary เป็น independent approval
ก่อน M2 ต้องระบุ dev Appwrite project/region/endpoint และ Auth provider ที่เปิดจริง พร้อม credentials ผ่าน ignored env
M3 ต้องยืนยัน Native Managed PostgreSQL, runtime/migration roles, TLS/CA/pooler และ permission/identity policy ก่อนเชื่อมข้อมูล
