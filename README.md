# wedapp-ZD — ชุดเริ่มต้นสำหรับ Codex, Claude และ ChatGPT
จัดทำ 13 พฤศจิกายน 2026 • เป้าหมายบนเครื่องผู้ใช้: `D:\Github\wedapp-ZD`

เอกสารนี้เริ่มจากชุดข้อกำหนดและแผนพัฒนา ปัจจุบันนำเข้าและสร้าง M0/M1 ในโฟลเดอร์ Windows จริงแล้ว
หน้าเริ่มต้นและ health ทำงาน local ได้ ดูผลตรวจและข้อจำกัดล่าสุดใน PROJECT_STATE.md
ยังไม่ได้เชื่อมบัญชี Appwrite หรือ GitHub remote และยังไม่มี integration/deployment ที่ทดสอบจริง
ชื่อ `wedapp-ZD` คงตามโฟลเดอร์ที่ผู้ใช้ระบุ ไม่เปลี่ยนเป็น webapp หรือชื่ออื่นเอง

## รันแอป local
ใช้ Node **24.22.1** และ pnpm **11.25.0** (pin ใน `.node-version` และ `package.json`)
เครื่องที่ตรวจมี pnpm แล้ว แต่ไม่มี npm ใน PATH; ใช้ pnpm และ `pnpm-lock.yaml` เท่านั้น

```powershell
Set-Location D:\Github\wedapp-ZD
pnpm install --frozen-lockfile
pnpm dev
```

เปิด http://127.0.0.1:3000 ไม่ต้องสร้าง `.env` เพื่อใช้ M1
`GET /api/health` = 200, `{"status":"ok"}` เป็น liveness เท่านั้น
`GET /api/ready` = 503 จนกว่าจะทำ integration จริง; config ครบจะยังรายงาน `not_connected`
ทั้งสอง endpoint ไม่เรียก Auth/DB และส่ง `Cache-Control: no-store`

```powershell
pnpm typecheck
pnpm lint
pnpm test
pnpm db:validate
pnpm db:generate
pnpm build
pnpm start
# ขณะ dev หรือ production server ทำงาน เปิด terminal อีกอัน:
pnpm test:smoke
```

`pnpm check` รวม typecheck/lint/unit/schema validation/build และหยุดเมื่อขั้นใดล้มเหลว
`db:generate` สร้าง client ที่ ignored ภายในเครื่องเท่านั้น ไม่เปิด connection ไม่สร้างตาราง
Prisma config ใช้ `DIRECT_URL` เฉพาะ CLI; ไม่ fallback ไป `DATABASE_URL`
ยังไม่มี migration/seed หรือ client ที่เชื่อม DB ใน request และ build ไม่ต้อง generate/connect DB

## Configuration และขอบเขต M1
`.env.example` มีเฉพาะค่าว่าง หากเริ่ม M2/M3 จึงค่อยคัดลอกเป็น `.env` ที่ ignored
ห้ามกรอก secrets ในไฟล์ตัวอย่างหรือส่งให้ reviewer; ห้ามใช้ `NEXT_PUBLIC_` กับค่าลับ

| ค่า | ใช้เมื่อ | เงื่อนไข |
|---|---|---|
| APP_URL | ใช้สร้าง URL/ตรวจ origin ใน flow อนาคต | optional ใน M1; HTTPS origin หรือ HTTP loopback เฉพาะ development |
| APPWRITE_ENDPOINT / APPWRITE_PROJECT_ID / APPWRITE_API_KEY | Auth configuration boundary | ใช้ server-only; HTTPS endpoint ลงท้าย `/v1`; ไม่มีการสร้าง session ใน M1 |
| DATABASE_URL | Runtime DB configuration boundary | PostgreSQL URL; remote ต้อง `sslmode=verify-full`; role จำกัดสิทธิ์ต้องตรวจจริงใน M3 |
| DIRECT_URL / SHADOW_DATABASE_URL | Prisma CLI ในงานที่ได้รับอนุญาตภายหลัง | แยกจาก runtime; ไม่ใช้ production เป็น shadow |

validation ตรวจรูปแบบเท่านั้น ไม่ยืนยันสิทธิ์ credentials, TLS handshake หรือการเชื่อมต่อ
หน้าเริ่มต้นไม่อ่าน cloud config จึงยังใช้ได้เมื่อค่าหายหรือไม่ถูกต้อง
ยังไม่มี login/logout/protected data, identity mapping, business schema หรือ mock login

## ข้อจำกัดเครื่องมือที่พบ
- Windows sandbox ทำให้ `tsx` อ่านข้อมูล user ไม่ได้ (`uv_os_get_passwd ENOMEM`); ทดสอบนอก sandbox ที่ได้รับอนุมัติแล้วผ่าน โดยไม่แก้ข้อจำกัดความปลอดภัยของระบบ
- Node downloader ของ Prisma พบ `ECONNRESET`; ดาวน์โหลด engine เดียวกันผ่าน HTTPS ด้วย PowerShell และตรวจ SHA-256 ทั้ง archive/binary แล้ว cache ใน node_modules ของเครื่องนี้ จึงรัน validate/generate ตามปกติได้ ดู handoff
- ESLint 9.39.4 เป็นรุ่น deprecated แต่ตรง peer ranges ของ plugins ใน Next.js 16.4.6; ทดลอง 10.14.0 แล้วมี peer mismatch จึงไม่ฝืน override ติดตามการอัปเกรดก่อนขยายระบบ
- Appwrite Sites Node 24 มีในเอกสารสาธารณะ แต่ยังไม่ตรวจ project/runtime/region จริง: **pending hosting compatibility**

## ที่มาและวิธีนำเข้า starter (เก็บเป็นบันทึก)
1. แตก ZIP ในโฟลเดอร์ชั่วคราว เช่น `D:\Downloads\wedapp-ZD-starter` อย่าแตกทับโค้ดเดิม
2. เปิด `D:\Github\wedapp-ZD` ใน Codex
3. คัดลอกคำสั่งจาก `START_CODEX.md` ไปให้ Codex และระบุ path ที่แตกชุดนี้ไว้จริง
4. ให้ Codex ตรวจโฟลเดอร์เดิมและนำไฟล์เข้าอย่างระมัดระวัง ก่อนทำ M0 และ M1
5. เมื่อจบงาน นำ `PROJECT_STATE.md`, handoff ล่าสุด และ diff ที่ตัด secrets แล้วส่งให้ Claude/ChatGPT

ถ้าโฟลเดอร์ว่าง ให้นำเนื้อหาชุดนี้เข้า root โครงการโดยตรง ไม่สร้าง nested app โดยไม่จำเป็น
ถ้ามีไฟล์ชื่อซ้ำ ให้ Codex อ่านและผสานเนื้อหา ห้ามใช้ overwrite ทั้งชุด
หาก Codex ใช้ WSL ให้ตรวจ Windows mount ที่เข้าถึงได้จริงก่อน ห้ามสมมติว่า `D:` มีอยู่ใน Linux

นำเข้าแล้วจาก `C:\Users\027707\Downloads\wedapp-ZD-starter\wedapp-ZD-starter`
ตรวจ hash ใน `MANIFEST.json` ก่อนนำเข้า; manifest นี้เป็นหลักฐานของ starter ต้นฉบับ ไม่ใช่ hash ของไฟล์หลังพัฒนา
ไม่มีไฟล์ชื่อซ้ำตอนนำเข้า และเก็บ `.gitattributes` เดิมครบ

## สิ่งที่เตรียมให้
| ไฟล์ | หน้าที่ |
|---|---|
| AGENTS.md / CLAUDE.md | กติกาการทำงานและบริบทของ AI |
| PROJECT_BRIEF.md | ขอบเขตระบบและคำถามธุรกิจที่ยังไม่มีคำตอบ |
| SYSTEM_ARCHITECTURE.md | โครงสร้างและลำดับการทำงาน |
| DATABASE_DESIGN.md / SECURITY_RULES.md | แนวทางข้อมูลและสิทธิ์ |
| PROJECT_STATE.md / TASKS.md | สถานะจริงและงานตามลำดับ |
| docs/COMPATIBILITY_AUDIT.md | หลักฐาน Stack และสิ่งที่ต้องตรวจบนเครื่องจริง |
| docs/AI_WORKFLOW.md | การส่งต่องานของ AI ทั้งสาม |
| docs/API_CONTRACT.md | สัญญาการทำงานของ endpoint ระยะแรก |
| docs/TEST_PLAN.md / docs/DEPLOYMENT.md | เกณฑ์ทดสอบและขึ้นระบบ |
| docs/decisions/ | บันทึกเหตุผลการตัดสินใจ |
| docs/handoffs/ | แบบฟอร์มส่งงานและบันทึกเริ่มต้น |
| prompts/ | คำสั่ง implementation, review และ requirements |
| .env.example / .gitignore | ค่า configuration เปล่าและรายการไม่เก็บใน Git |

## ขอบเขตการอนุญาตในรอบแรก
ทำงานเอกสารและโค้ด local ที่ย้อนกลับได้ ตรวจเครื่องมือ ติดตั้ง dependencies ในโครงการ และทดสอบได้
อย่า push, deploy, สร้างทรัพยากรเสียเงิน, ใช้ฐานข้อมูลจริง หรือแก้ production ในรอบเริ่มต้นนี้
การอนุญาตเพิ่มเติมของเจ้าของในภายหลังให้บันทึกใน PROJECT_STATE.md และใช้ตามขอบเขตจริง
ไม่ต้องขออนุญาตซ้ำสำหรับงานที่เจ้าของอนุญาตไว้แล้ว
