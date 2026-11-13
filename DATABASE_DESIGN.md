# Database design — foundation proposal

ยังไม่มี business schema และยังไม่มี migration ถูกสร้างหรือรัน
ใช้ native PostgreSQL ผ่าน Prisma; TablesDB permissions ไม่ใช่สิทธิ์ของ SQL connection นี้

## ตาราง infrastructure ที่อาจใช้ใน M3
| Candidate | จุดประสงค์ | ข้อจำกัด |
|---|---|---|
| AppUser | mapping local ID กับ Appwrite user ID | external ID unique; status active/disabled; ไม่เก็บ password |
| Role / Permission / assignments | การกำหนด action ที่อนุญาต | สร้างเมื่อยืนยัน permission matrix; ไม่ให้ signup กำหนดสิทธิ์เอง |
| AuditEvent | การเปลี่ยนข้อมูล/สิทธิ์ที่ต้องติดตาม | allowlist fields; ไม่บันทึก session หรือ request body ทั้งก้อน |
นี่เป็นข้อเสนอ ไม่ใช่บทบาทธุรกิจที่ยืนยันแล้ว อย่า seed admin หรือสร้าง user จากอีเมลที่เดาเอง
หากความต้องการเรียบง่ายให้ใช้ authorization model ที่เล็กกว่านี้ได้ โดยบันทึก ADR

## Connection และ migration
- DATABASE_URL: runtime account แบบจำกัดสิทธิ์ ผ่าน pooler ที่ Console ยืนยัน
- DIRECT_URL: migration connection/account; ไม่จำเป็นต้องติดตั้งใน runtime deployment
- SHADOW_DATABASE_URL: พื้นที่ development ที่ทิ้งได้สำหรับ migration workflow ที่ต้องใช้ shadow
- Credentials/ports/CA ให้คัดจาก environment จริง ไม่สร้าง hostname ขึ้นเอง
- Direct/pooler defaults ในเอกสาร Appwrite เป็น 5432/6432; ตรวจ actual project ก่อนใช้
- หากเลือก Prisma 7 ให้ตรวจ prisma.config.ts, client generator, @prisma/adapter-pg และ pg ตามคู่มือรุ่นนั้น
- ห้ามนำตัวอย่าง Prisma 7 ไปใช้กับ major อื่นโดยไม่ได้ตรวจคำสั่ง/config
- แยก migration role และ runtime role; runtime ไม่ควรทำ DDL/เป็น owner ที่ข้าม RLS
- ตรวจ indexes, foreign keys, nullability และ unique constraints จาก access patterns จริง

## Shadow safety
คู่มือ Appwrite Prisma มีตัวอย่าง shadow schema; ก่อนใช้ต้องยืนยันว่า Prisma รุ่นที่เลือก isolate และ reset พื้นที่นั้นได้จริง
ห้ามชี้ shadow ไป schema ที่มีข้อมูลแอป หรือ production แม้ใช้ hostname เดียวกัน
เมื่อไม่มีพื้นที่ shadow ที่ตรวจสอบแล้ว ให้เตรียม schema/diff ใน local DB ที่ทิ้งได้ หรือรายงาน migration-dev blocked
ไม่รัน migrate reset, db push หรือ drop เพื่อแก้ปัญหาอัตโนมัติ

## สิทธิ์แถวข้อมูล
M3 ต้องมี authorization ฝั่ง server ครบทุก path ก่อนเชื่อมข้อมูล
หากต้องแยกหลายหน่วยงาน ให้ตัดสินใจ tenant model ก่อนสร้าง business tables
RLS เป็นทางเลือกเสริมที่ต้องออกแบบจริง; หากใช้ session context กับ transaction pool ต้อง set context แบบ transaction-local และทดสอบว่าไม่รั่วข้ามผู้ใช้
อย่าอ้างว่า Appwrite login เปิด PostgreSQL RLS ให้อัตโนมัติ
