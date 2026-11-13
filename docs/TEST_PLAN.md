# Verification plan

## M1 (ไม่ใช้ cloud credentials)
- pnpm install --frozen-lockfile, pnpm typecheck, pnpm lint, pnpm test, pnpm db:validate, pnpm db:generate, pnpm build
- เริ่ม dev server และตรวจหน้าเริ่มต้นกับ /api/health
- config validation: missing optional cloud values ไม่ทำ shell พัง; required values ของ integration ถูก reject อย่างมีข้อความที่ปลอดภัย
- health ไม่เรียก database และไม่คืน environment/secrets
- ตรวจ git diff ว่าไม่มี credentials; ทดสอบ error paths ที่เขียนจริง ไม่สร้าง tests เปล่าหรือ mirror implementation
- pnpm test:smoke ขณะรัน dev/start: หน้าไทย 200, health 200, ready 503, health POST 405
- unit tests ใน tests/unit: config isolation, URL/TLS policy, credential redaction, ไม่ใช้ migration credentials ใน runtime, valid config ไม่ใช่ integration success
- test double มีเฉพาะ global fetch ที่โยน error เมื่อมี network call ใน tests/unit/health.test.ts; config fixtures ใช้ `.invalid`/synthetic values เท่านั้น
- browser visual/keyboard inspection แยกจาก automated HTTP tests; ไม่ถือว่าเป็น full accessibility audit

## M2/M3 (development credentials และ synthetic accounts เท่านั้น)
| Scenario | Expected |
|---|---|
| No/forged/expired/revoked session | protected operation ถูกปฏิเสธ |
| User A และ B เรียก instance เดียวกันสลับกัน | ไม่มี session หรือ private cache ปะปน |
| Login invalid password | generic failure และ rate limit ทำงาน |
| Cross-origin mutation | ถูกปฏิเสธตาม CSRF policy |
| Missing/disabled local mapping | default deny |
| Role หรือ ownerId ปลอมใน request | ไม่มีผลต่อสิทธิ์ |
| Access another user's protected record | ปฏิเสธตาม permission matrix |
| Logout แล้วใช้ cookie เดิม | เข้า protected operation ไม่ได้ |
| Auth/DB ล่ม | controlled error; ไม่ fallback เป็นข้อมูล authenticated ปลอม |
| Runtime DB credential ทำ DDL | ถูกปฏิเสธ |
| Concurrent provisioning ของ external ID เดียวกัน | unique mapping ไม่ซ้ำ |
| Migration ใน disposable dev environment | schema ถูกต้อง; ไม่แตะ production/shadow ผิดพื้นที่ |

## Reporting
ทุกคำสั่งระบุ command, timestamp, exit result และสิ่งที่ตรวจจริง
แยก mocked unit tests ออกจาก real integration tests
สถานะ: PASS / FAIL / BLOCKED / NOT RUN
ถ้า login จริงยังไม่ทดสอบ ให้รายงานตรง ๆ แม้ unit tests และ build ผ่าน
คำสั่ง Prisma ต้องใช้ชื่อและ flags ที่ตรงกับ major ที่เลือกและบันทึกใน compatibility audit
