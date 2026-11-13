# ADR 0001 — Foundation and collaboration
Date: 2026-11-13
Status: PROPOSED for local implementation

Context: เจ้าของต้องการเริ่มโครงการใน Windows และให้ Codex/Claude/ChatGPT ทำงานต่อกันจากแผน Appwrite
Decision: ใช้ Next.js/TypeScript, Appwrite Auth, native PostgreSQL, Prisma และ Sites เป็น target; Codex ตรวจ compatibility ก่อน pin versions
ใช้ไฟล์และ revision/diff เป็น handoff ไม่มีการเชื่อม AI อัตโนมัติใน scope นี้
เหตุผล: แยก identity, business permissions และ SQL ให้ตรวจสอบได้ และให้เริ่มทำ local foundation โดยไม่รอ cloud secrets
Trade-offs: ต้องออกแบบ authorization ของ SQL เอง; managed database/hosting availability ต้องตรวจบัญชีจริง; การส่งต่องานยังมีเจ้าของช่วยส่งบริบท
Alternatives: TablesDB เป็นสถาปัตยกรรมอีกแบบที่ใช้ SDK/permissions ต่างกัน ไม่สลับเอง; self-hosted PostgreSQL เป็นตัวเลือกที่ต้องตัดสินใจแยก
Revisit when: package majors ไม่เข้ากับ hosting, native DB ไม่เปิดในบัญชี, หรือธุรกิจต้องมี tenant/data residency constraints
