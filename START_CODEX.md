# คัดลอกคำสั่งนี้ให้ Codex ที่เปิดโฟลเดอร์โครงการ

คุณคือ Lead Implementer ของโครงการ wedapp-ZD ทำงานในโฟลเดอร์ที่ฉันเปิดให้เข้าถึง ซึ่งควรเป็น D:\Github\wedapp-ZD
ให้ลงมือทำงานจริง ไม่หยุดแค่เสนอแผน

เริ่มจากตรวจ current working directory, คำสั่งภายใต้ AGENTS.md ที่มีอยู่, รายชื่อไฟล์, Git status และ branch โดยอย่าแสดง secrets
หากอยู่คนละโครงการหรือเข้าถึง path ไม่ได้ ให้รายงานข้อจำกัด ห้ามสร้างโฟลเดอร์ชื่อ D:\Github\wedapp-ZD บน Linux เพื่อแกล้งแทน path จริง

ฉันมีชุด wedapp-ZD-starter ที่แตก ZIP ไว้แล้ว หากยังไม่ทราบตำแหน่งให้ถามเฉพาะ path ของชุดนี้
อ่าน README.md และไฟล์แผนในชุดนี้ก่อนผสานเข้า root โครงการ เก็บไฟล์เดิมและงานที่ยังไม่ commit ไว้ทั้งหมด
ถ้ามี AGENTS.md, CLAUDE.md, README.md, .gitignore หรือเอกสารชื่อซ้ำ ให้อ่านและรวมกติกาที่ไม่ขัดกัน ห้ามเขียนทับทั้งไฟล์

จากนั้นอ่าน AGENTS.md, PROJECT_BRIEF.md, SYSTEM_ARCHITECTURE.md, SECURITY_RULES.md,
PROJECT_STATE.md, TASKS.md และ docs/COMPATIBILITY_AUDIT.md
ทำ M0 และ M1 ตาม prompts/01_CODEX_BOOTSTRAP.md ให้เสร็จเท่าที่สภาพแวดล้อมรองรับ
ตรวจ compatibility จากเอกสารทางการและ package registry ก่อนเลือกเวอร์ชัน แล้วบันทึกเลขเวอร์ชันจริงและ lockfile
ใช้ Next.js + TypeScript + Appwrite Auth + Native Managed PostgreSQL + Prisma + Appwrite Sites เป็นสถาปัตยกรรมเป้าหมาย
อย่าสลับฐานข้อมูลเป็น TablesDB, Supabase หรือบริการอื่นเอง

รอบนี้ให้สร้าง foundation ที่รัน local ได้: หน้าเริ่มต้นภาษาไทย, health endpoint, โครงสร้าง server/service,
configuration validation, tooling และเอกสาร โดยยังไม่สร้างฟังก์ชันธุรกิจที่ฉันไม่ได้ระบุ
เมื่อไม่มี credentials ให้หน้าเริ่มต้นและ liveness ยังทำงานได้ ส่วนเส้นทางที่ต้องเชื่อมบริการให้แจ้งยังไม่พร้อมอย่างตรงไปตรงมา
ห้ามทำ mock login ที่เข้าถึงข้อมูลจริงได้ ห้ามรายงาน integration ผ่านโดยไม่ได้เชื่อมจริง

อย่า push, deploy หรือเปลี่ยน remote database ในรอบนี้ ไม่ต้องรอ credentials เพื่อทำงาน local ที่ไม่เกี่ยวข้อง
เมื่อจบ ให้รายงานไฟล์ที่เปลี่ยน คำสั่งและผลทดสอบจริง สิ่งที่ยังไม่ได้ทดสอบ และ blockers
อัปเดต PROJECT_STATE.md, TASKS.md และ docs/handoffs/ พร้อม branch/commit หรือ uncommitted diff ที่ใช้ตรวจสอบ
