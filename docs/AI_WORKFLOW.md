# การทำงานร่วมกันของ AI

| ผู้ทำงาน | งานหลัก | สิ่งที่ส่งมอบ |
|---|---|---|
| เจ้าของโครงการ | กำหนดเป้าหมายและยืนยันพฤติกรรมที่ต้องการ | requirement/acceptance/การอนุญาตตาม scope |
| ChatGPT | วิเคราะห์ flow, แบ่งงาน, ตรวจความครบถ้วน | brief, acceptance criteria, คำถาม/ข้อเสนอการตัดสินใจ |
| Codex | อ่าน repo, เขียนโค้ด, รัน checks, แก้ findings | code diff, test evidence, state/handoff |
| Claude | ตรวจ source อย่างเป็นอิสระ | findings ตามความรุนแรงและหลักฐาน |

นี่ไม่ใช่ระบบให้ AI ติดต่อกันเองผ่าน API ไม่มี shared memory อัตโนมัติ และยังไม่ได้ติดตั้ง MCP
หาก ChatGPT/Claude ไม่มี repo access ให้เจ้าของส่งไฟล์หรือ diff ที่ตัด secrets แล้ว พร้อม revision ที่ใช้ตรวจ
MCP เป็นเครื่องมือเสริมเมื่อมีการเชื่อมจริง; การมี plugin ของ AI หนึ่งไม่แปลว่าอีก AI มีสิทธิ์เดียวกัน
เริ่มด้วย read-only inspection ของ project ID/region/resources โดยไม่ dump credentials; ไม่จำเป็นต้องมี MCP เพื่อทำ M0/M1

## รอบงานมาตรฐาน
1. เขียน task ที่มี input/output และ acceptance ชัดเจน
2. ระบุ code owner และ branch; ตรวจ working tree ก่อนแก้
3. Codex implement และตรวจพฤติกรรมที่เปลี่ยน
4. ส่ง handoff: task, revision/diff, ไฟล์, results, blockers, จุดให้ reviewer ตรวจ
5. Claude ตรวจ source และแยก blocking/non-blocking findings
6. Codex แก้ findings; ส่ง diff ใหม่; reviewer ตรวจส่วนที่เปลี่ยนอีกครั้ง
7. ChatGPT เทียบผลกับ requirement และช่วยเจ้าของตัดสินใจขั้นถัดไป

หาก requirement เปลี่ยนให้อัปเดต brief/task/ADR ก่อนทำงานต่อที่พึ่งพาการตัดสินใจนั้น
ถ้ามีหลาย session อย่าแก้ไฟล์ร่วมพร้อมกันใน working tree เดียว; งานขนานใช้ branch/worktree แยกเมื่อเจ้าของร้องขอ
ไม่ใช้ PROJECT_STATE.md เป็น lock ทางเทคนิค มันเป็นบันทึกประสานงานเท่านั้น

## คำถามที่ต้องถามเมื่อถึงจุดจำเป็น
ถามเมื่อเลือก project/repo ไม่ได้, มี requirement ขัดกัน หรือจำเป็นต้องใช้ข้อมูลที่ไม่มี
หากยังทำงานส่วนอื่นได้ ให้ทำต่อและบันทึก blocker เฉพาะส่วน ไม่หยุดทั้ง milestone โดยไม่จำเป็น
