# Codex implementation task — M0 and M1
ลงมือในโครงการที่เปิดอยู่ อ่าน AGENTS.md และ state ก่อน

## M0
1. ตรวจ current path, ไฟล์เดิม, applicable instructions, Git state/branch โดยเก็บงานผู้ใช้ทั้งหมด
2. ตรวจ Node/npm/Git และ existing package manager; Docker optional; ตรวจ Codex/Claude CLI เฉพาะถ้ามี ไม่บังคับติดตั้ง
3. อ่าน official docs ใน compatibility audit และตรวจ registry versions/engines/release status
4. เลือกเวอร์ชันที่เข้ากันทั้ง Next/React/TS/Prisma/driver/Appwrite SDK/Node; บันทึกเหตุผลและ exact versions
5. หาก host runtime ยังตรวจไม่ได้ให้ระบุ pending hosting compatibility ไม่กล่าวว่า deploy-ready

## M1
1. สร้าง Next.js App Router + TypeScript ภายใน root อย่างไม่ทับ starter/ไฟล์เดิม
2. ทำหน้าเริ่มต้นภาษาไทยแบบเรียบง่ายที่บอกว่าเป็น foundation พร้อมสถานะยังไม่เชื่อมบริการเมื่อเป็นจริง
3. ทำ GET /api/health ตาม contract; ไม่มี DB call หรือ secret ในผลลัพธ์
4. เตรียม server-only env/auth/db boundaries เท่าที่มี implementation ใช้; Prisma config ตาม major ที่เลือก ไม่ invent schema ธุรกิจ
5. ไม่มี fake credentials หรือ fake login; ใช้ unit test doubles ได้เฉพาะ test files และระบุให้ชัด
6. เพิ่ม scripts dev/build/start/typecheck/lint/test ที่รันได้จริง และ tests ของ health/config ที่มีพฤติกรรมสำคัญ
7. บันทึก exact dependencies, lockfile, Node version และวิธี setup; ใช้ local font/system font ถ้าการ fetch font ทำให้ build ต้องพึ่ง network โดยไม่จำเป็น
8. รัน checks และ smoke test หน้าเริ่มต้น; แก้ปัญหาที่อยู่ใน scope จนผ่าน
9. หาก dependency install/network/toolchain บล็อก ให้ทำเอกสาร/โครงสร้างที่ทำต่อได้ พร้อมบันทึก command/error จริง ไม่รายงานว่าผ่าน
10. อัปเดต PROJECT_STATE.md/TASKS.md/CHANGELOG.md และ handoff ใหม่

หยุดขอบเขตที่ M1 ไม่ push/deploy/สร้าง resource/migrate remote เอง
คำตอบสุดท้ายภาษาไทย: สิ่งที่ทำได้, ไฟล์สำคัญ, ผลตรวจจริง, สิ่งที่ไม่ได้ตรวจ, ข้อมูลจำเป็นสำหรับ M2
