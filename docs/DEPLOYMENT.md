# Deployment runbook — use after local foundation

## ก่อน deploy
ยืนยันบัญชี/project/site/repo/branch/region และ scope ที่เจ้าของอนุญาต
ตรวจ Appwrite Sites runtime ว่ารองรับ Node/dependencies ที่เลือกจริง
แยก staging ออกจาก production และยืนยัน auto-deploy branch; push อาจทำให้ deploy อัตโนมัติเมื่อเชื่อมไว้

## Build and secrets
ตาม Next.js guide ของ Appwrite output `./.next`; โครงการเลือก pnpm แล้ว จึงใช้ install `pnpm install --frozen-lockfile` และ build `pnpm build` เมื่อ host ยืนยันว่ามี pnpm 11.25.0
เลือก Node 24 (local pin 24.22.1); ตรวจ patch version จริงและ package-manager availability ในบัญชีก่อน deploy
คำสั่ง `pnpm start` ในโครงการ bind 127.0.0.1 สำหรับ local; ให้ใช้ framework integration ของ Sites และตรวจ binding/start settings ของ host จริงเมื่อถึง M5
ยังไม่มี Appwrite site configuration ที่ deploy/ทดสอบแล้ว; pending hosting compatibility
ตรวจ build/runtime environment scopes จริงก่อน deploy
Server runtime ใช้ DATABASE_URL และ Auth key ที่ scope แคบ; DIRECT_URL/SHADOW_DATABASE_URL ใช้เฉพาะ migration job/dev ตามจำเป็น
อย่าแปะ secrets ใน source, build logs, handoff หรือ public env prefix

## Migration sequencing
1. สร้าง migration ใน isolated development workflow และตรวจ SQL
2. ทดสอบ migration บน staging พร้อมข้อมูลสังเคราะห์และ backup ตาม scope
3. ใช้ deploy migration command ที่ตรง Prisma major จาก job แยกที่อนุญาตแล้ว
4. Deploy app revision ที่เข้ากับ schema; smoke test login/permissions/data path
5. บันทึก revision, schema migration และผลทดสอบ
ห้ามรัน migrate dev/reset ใน production หรือ migration ทุกครั้งที่ build/request

## Rollback and operations
การย้อน app release ไม่ได้ย้อนข้อมูลใน DB อัตโนมัติ
ออกแบบ schema change ให้ backward-compatible เมื่อทำได้; destructive change ต้องมีแผนข้อมูลเฉพาะ
ทดสอบ restore ใน environment แยกก่อนบอกว่ากู้คืนได้จริง
ตรวจ logs, errors, uptime และ connection pool หลัง deploy
ยังไม่มี site URL หรือ deployment ID ในชุดเริ่มต้นนี้

Reference: https://appwrite.io/docs/products/sites/quick-start/nextjs
