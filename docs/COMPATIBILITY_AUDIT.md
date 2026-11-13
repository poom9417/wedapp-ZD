# Compatibility audit
ตรวจเอกสารสาธารณะ, npm registry และเครื่อง Windows เมื่อ 2026-11-13; ยังไม่ได้ตรวจ Appwrite account จริง
“เอกสารรองรับ” ไม่เท่ากับ “โปรเจกต์นี้เชื่อมสำเร็จ”

| ประเด็น | ผลจากเอกสาร | สิ่งที่ Codex ต้องตรวจต่อ |
|---|---|---|
| Next.js บน Appwrite Sites | คู่มือรองรับ Next.js และ Node container | เวอร์ชัน framework/runtime/build ที่มีในบัญชีจริง [S1] |
| Native PostgreSQL | มี direct SQL; แยกจาก TablesDB | availability, plan, region และ credentials ของ project [S2] |
| Prisma | Appwrite มีตัวอย่าง Prisma 7 + adapter + config | ตรวจ release ปัจจุบันและเลือก major เดียวกันทั้งชุด [S3,S6] |
| Migration | เอกสารแยก runtime/direct และกล่าวถึง shadow | ทดสอบ privileges และ isolation ใน dev [S3] |
| Auth SSR | server SDK, session client ต่อ request | SDK version, cookie/expiry และ provider จริง [S4] |
| SQL access control | roles, grants และ RLS เป็นของ PostgreSQL | app-user authorization ยังต้องออกแบบเอง [S7] |
| Node | ข้อกำหนดต่างกันตาม Next/Prisma major | เลือก intersection ที่ host รองรับและ pin จริง [S5,S6] |
| AI connectors/MCP | ยังไม่ตรวจการติดตั้งในบัญชีของผู้ใช้ | ไม่ถือว่าติดตั้งหรือแชร์ session แล้ว; optional สำหรับ M0/M1 |

## จุดที่ปรับจากไฟล์ต้นฉบับ
- เก็บ Stack เดิม แต่ไม่ใช้คำว่า latest อย่างเดียวเป็นข้อกำหนดที่ทำซ้ำได้
- เอกสาร Appwrite Prisma ที่เปิดระบุ Prisma 7 ขณะที่หน้า getting-started ของ Prisma กล่าวถึง Prisma 8 จึงต้องตรวจ release status และ package registry ตอนติดตั้ง ไม่ผสม API/commands คนละ major
- เพิ่ม migration/shadow design และแยก credential ของ migration ออกจาก runtime
- เปลี่ยน “รอ credentials แล้วหยุด” เป็นทำ local shell/checks ต่อได้ และติดป้ายเฉพาะ integration ที่ยัง blocked
- เพิ่ม Claude reviewer และ handoff ที่ระบุ revision; ไม่สมมติว่า AI ทั้งสามแชร์ไฟล์/ความจำ
- ไม่สรุปว่า plan/region/backup feature เปิดใช้ในบัญชีนี้แล้วจากเอกสารสาธารณะ
- ไม่สร้าง business schema ก่อนมี use case และ permission matrix

## Local audit — actual findings
Workspace `D:\Github\wedapp-ZD`, Windows PowerShell; original branch main, base `b4ee3297fdcf7be8555c61a9e635b256ca92e0d8`, clean before import.
Original tracked file: `.gitattributes`; no applicable AGENTS.md in root or D:/D:/Github before import. No configured Git remote.
Starter source: `C:\Users\027707\Downloads\wedapp-ZD-starter\wedapp-ZD-starter`; 25 files imported after matching original manifest hashes, no path collisions.
Working branch: `codex/m0-m1-foundation`; no commit created.

| Tool | Verified version/status |
|---|---|
| Node | 24.22.1, pinned in .node-version; engines >=24.22.1 <25 |
| pnpm | 11.25.0, packageManager and engines pinned; pnpm-lock.yaml only |
| npm | Not available in PATH; not required by chosen workflow |
| Git | 2.55.0.windows.5 |
| Codex CLI | 0.153.4; sandbox emitted a PATH-alias/home-directory warning, not an app blocker |
| Claude CLI / Docker | Not found by Get-Command; optional, not installed |

## Exact package selection
Registry evidence: `registry-audit.json` (initial latest metadata), `registry-selected.json` (explicit selected candidates).
Both are public metadata only; package.json and pnpm-lock.yaml establish the final installed versions.
The initial full Prisma metadata query returned no usable latest tag; exact `/prisma/7.10.1` was verified separately before installation.

| Packages | Pinned | Reason |
|---|---|---|
| next / eslint-config-next | 16.4.6 | Same release; Next requires Node >=20.9, React 19 accepted |
| react / react-dom | 19.3.1 | Matched pair, React DOM peer ^19.3.1 |
| typescript | 5.9.3 | Supported by Prisma >=5.4 and typescript-eslint >=4.8.4 <6.1; registry latest 7.0.2 excluded |
| prisma / @prisma/client / @prisma/adapter-pg | 7.10.1 | Consistent stable v7 APIs/config; v8 release candidate not selected |
| pg / @types/pg | 8.23.1 | Standard native PostgreSQL driver/adapter dependency |
| node-appwrite | 31.2.0 | Node >=20; server SDK installed for next milestone, not connected in M1 |
| eslint | 9.39.4 | Compatible with current Next plugins, but deprecated; maintenance limitation recorded |
| @types/node | 24.19.2 | Matches chosen Node major, not registry latest 26.x |
| @types/react / @types/react-dom | 19.3.0 | Matched React 19 definitions |
| tsx | 4.23.15 | Unit tests with Node test runner |
| server-only | 0.0.1 | Build-enforced server boundary |
| dotenv | 18.0.10 | Prisma CLI loads ignored .env; not required by landing page |

`pnpm peers check`: no peer dependency issues with the final set.
ESLint 10.14.0 was tested and lint passed, but peer metadata rejected it in eslint-plugin-import 2.32.0, eslint-plugin-jsx-a11y 6.10.2 and eslint-plugin-react 7.37.5. Reverted to 9.39.4 without overrides; do not interpret this choice as maintained ESLint 9 support.

## Hosting/database boundary
Appwrite's runtime table and 2026-10-23 changelog explicitly include Node 24 for Sites [S9,S10].
Node 24.22.1 satisfies installed Next, Prisma, pnpm and tooling engines. Local validation/build passed.
Account-specific Node patch, pnpm installation, build/start settings, native PostgreSQL availability/region/plan, TLS/CA, pooler and DB roles remain **pending hosting compatibility / NOT TESTED**.
No cloud credentials were supplied; presence-only check found all seven template variables unset. No .env with real values exists in this workspace.
No TablesDB/Supabase/other database substitution. Appwrite Auth does not establish SQL authorization automatically.

## Verification summary
2026-11-13 08:48–08:49 +07:00: frozen install, peer check, typecheck, lint, unit 10/10, build, Prisma validate/generate and HTTP smoke 4/4 on both dev and production passed.
Prisma engine Node download initially failed (ECONNRESET); official engine archive and binary downloaded with PowerShell and SHA-256 verified, then cached in node_modules. Default validate/generate now pass locally; no TLS verification bypass or database connection was used.
Browser: Thai rendering at default desktop and 390px; no horizontal overflow; keyboard skip-link reaches main action. Full accessibility/cross-browser audit not performed.
Full commands, failures/recovery and limits: handoffs/0001-m0-m1-foundation.md.

## Sources
- [S1] https://appwrite.io/docs/products/sites/quick-start/nextjs
- [S2] https://appwrite.io/docs/products/databases/postgresql
- [S3] https://appwrite.io/docs/products/databases/postgresql/integrations/prisma
- [S4] https://appwrite.io/docs/products/auth/server-side-rendering
- [S5] https://nextjs.org/docs/app/getting-started/installation
- [S6] https://www.prisma.io/docs/getting-started
- [S7] https://appwrite.io/docs/products/databases/postgresql/concepts/access-control
- [S8] https://appwrite.io/docs/products/databases/postgresql/connections
- [S9] https://appwrite.io/docs/products/functions/runtimes (states that non-Flutter/Static runtimes also work for Sites)
- [S10] https://appwrite.io/changelog/entry/2026-10-23
- [S11] https://www.prisma.io/docs/orm/v7/reference/prisma-config-reference
- [S12] https://docs.prisma.io/docs/orm/reference/system-requirements
- [S13] https://www.prisma.io/docs/prisma-orm/quickstart/postgresql (v8 RC notice; v7 remains supported)
- Registry: https://registry.npmjs.org/next/16.4.6 ; https://registry.npmjs.org/prisma/7.10.1 ; https://registry.npmjs.org/typescript/5.9.3
- Installed Next.js version-matched guides read: node_modules/next/dist/docs/01-app/01-getting-started/15-route-handlers.md, 02-guides/server-and-client-boundary.md, 03-api-reference/05-config/01-next-config-js/agentRules.md
ลิงก์เหล่านี้เป็น evidence ของข้อเท็จจริงที่ระบุ; design decisions อื่นในชุดนี้เป็นข้อเสนอของโครงการ
