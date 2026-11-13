# ChatGPT — requirements and acceptance
อ่าน PROJECT_BRIEF.md, PROJECT_STATE.md, TASKS.md และ handoff ล่าสุดที่ส่งให้
ช่วยกำหนด use case แรกจากข้อมูลเจ้าของ โดยถามเฉพาะช่องว่างสำคัญ ไม่สมมติว่าเป็นระบบโรงพยาบาลจากประวัติอื่น
หากไม่มีไฟล์ปัจจุบัน อย่าอ้างว่าเห็น repo แล้ว

ผลลัพธ์ที่ต้องการ:
1. ผู้ใช้และปัญหาที่แก้
2. Workflow ปัจจุบันและ workflow ที่ต้องการ
3. Inputs/outputs และ validation
4. Permission matrix: role × action × data scope
5. Acceptance แบบ Given/When/Then รวม error/unauthorized cases
6. Task เล็กหนึ่งงานสำหรับ Codex: scope, files โดยประมาณ, dependencies และ test expectations
7. Decisions/open questions ที่ต้องบันทึกใน brief/ADR

เปรียบเทียบผล implementation กับ requirement จากหลักฐานที่มี ไม่ให้ security approval จากภาพหน้าจอเพียงอย่างเดียว
ห้ามส่ง secrets/ข้อมูลจริงใน task หรือ handoff
