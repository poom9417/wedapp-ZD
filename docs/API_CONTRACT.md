# Foundation endpoint contract
M1 implemented locally on 2026-11-13. M2/M3 rows below remain planned, not available routes.

| Endpoint | Milestone | ผลสำเร็จ | เงื่อนไขสำคัญ |
|---|---|---|---|
| GET /api/health | M1 | 200, {"status":"ok"} | liveness เท่านั้น ไม่เรียก Auth/DB; ไม่เปิดเผย version/secrets |
| GET /api/ready | M1 | 503, status=not_ready | ประเมิน config ใน server; ยังไม่ probe/connect บริการ; ไม่คืนค่า config |
| POST /api/auth/login | M2 | 204 + session cookie | ตรวจ credentials ฝั่ง server, จำกัด attempts, generic error |
| POST /api/auth/logout | M2 | 204 + clear cookie | revoke provider session, CSRF/origin check |
| GET /api/me | M3 | 200, minimal local profile | verified session + active provisioned mapping; private/no-store |

M1 endpoints ใช้ Node runtime, dynamic responses และ `Cache-Control: no-store`
`POST /api/health` ตอบ 405; ไม่มี mutation endpoint ใน M1
`/api/ready` คืน `checks.application.status` = configured/invalid_configuration (APP_URL optional)
และ `checks.auth.status` / `checks.database.status` = not_configured/invalid_configuration/not_connected
`configured` ภายใน validator แปลว่ารูปแบบครบเท่านั้น จึงแปลงเป็น `not_connected` สำหรับ integration
พร้อม `error.code=INTEGRATION_NOT_READY` และข้อความภาษาไทย ไม่มีค่าของ environment/credentials
readiness จงใจไม่ตอบ 200 ใน M1 แม้ config ครบ จนกว่าจะมี live integration verification ใน milestone ถัดไป

## Error policy
400: input ไม่ถูกต้อง; 401: ไม่มี session ที่ใช้ได้; 403: ไม่มีสิทธิ์หรือถูก disable;
429: attempts เกินกำหนด; 503: dependency/config ยังไม่พร้อม; 500: unexpected error ที่ตัดรายละเอียดภายในแล้ว
ใช้รูปแบบ {"error":{"code":"...","message":"..."}} สำหรับ JSON API errors
หลีกเลี่ยงข้อความที่บอกว่าอีเมลนั้นมีบัญชีอยู่หรือไม่ใน login response

## เมื่อไม่มี credentials
หน้า shell และ /api/health ยังใช้ได้ ไม่เรียก network
Auth routes ที่ยังไม่ implement ไม่แสดงว่า login สำเร็จ; เมื่อ implement แต่ไม่มี config ให้ 503 ที่ไม่เปิดเผย secrets
หน้า protected content ต้อง default deny เสมอ ไม่มี demo mode ที่ผ่านเข้าสู่ production services
เลือก server actions แทน routes สำหรับบาง interaction ได้ แต่ต้องอัปเดต contract และทดสอบด้วย policy เดียวกัน
