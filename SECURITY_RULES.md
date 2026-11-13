# Security and access rules
ขอบเขตนี้เป็นเกณฑ์การออกแบบและตรวจสอบ ยังไม่ได้รับรองระบบที่ยังไม่ถูกสร้าง

- Secrets อยู่ใน local ignored env หรือ secret settings ของบริการเท่านั้น; .env.example มีค่าว่าง
- ห้าม NEXT_PUBLIC_ สำหรับ API keys, database URLs, session secrets
- ใช้ server-only boundary สำหรับ Auth/DB modules; ไม่ส่ง raw ORM objects หรือ credentials ไป browser
- ตรวจ session กับผู้ให้บริการ ไม่เชื่อ cookie เพียงเพราะมีค่า; สร้าง SDK client ใหม่ต่อ request
- Cookie: HttpOnly, Secure บน HTTPS, SameSite ที่เหมาะกับ flow, path และ expiration สอดคล้องกับ session; local HTTP exception ต้องจำกัดเฉพาะ development
- Logout revoke session กับ provider และล้าง cookie; session หมดอายุหรือถูก revoke ต้องเข้า protected route ไม่ได้
- ป้องกัน CSRF สำหรับ state-changing cookie-auth requests ด้วยกลไกที่ตรง framework/route; ตรวจ Origin ที่อนุญาต ห้าม mutation ผ่าน GET
- ตรวจ input ฝั่ง server และจำกัด payload; error ไม่เปิดเผย credentials หรือ stack trace
- Login ที่ใช้ admin API key อาจ bypass provider rate limit; ต้องมี rate limit ของแอปที่เหมาะกับหลาย instance ก่อนเปิดสาธารณะ
- ตรวจ role/action และ record scope ทุก protected read/write; default deny เมื่อ identity mapping/permission ไม่ครบ
- Application DB credential ไม่ใช้ admin; migration credential แยกและไม่ใช้งานในคำขอเว็บ
- ไม่ auto-create privileged user, ไม่เชื่อ role/owner ที่ client ส่ง, ไม่เปิด self-registration จนกว่าจะตัดสินใจ
- หากใช้ private files ต้องบังคับสิทธิ์ object และ download ด้วย ไม่ใช่ป้องกันเฉพาะตาราง metadata
- Logs/handoffs ใช้ synthetic data และ redaction; ไม่ส่ง .env ไปให้ AI ตัวอื่น
- No cache sharing of private responses; ทดสอบผู้ใช้ A/B บน instance เดียวกัน
- ใช้ TLS ตาม provider และ driver จริง ไม่แก้ปัญหาด้วยการปิด certificate verification ทั่วระบบ

หลักฐานทางการเรื่อง session: https://appwrite.io/docs/products/auth/server-side-rendering
หลักฐานเรื่อง SQL privileges/RLS: https://appwrite.io/docs/products/databases/postgresql/concepts/access-control
ข้อกำหนดเพิ่มเติมข้างต้นเป็น design policy ของโครงการ ต้องทดสอบ implementation จริงก่อนระบุว่าใช้งานได้
