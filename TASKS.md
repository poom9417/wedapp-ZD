# Milestones and acceptance
Updated 2026-11-13: M0/M1 implemented and locally verified; independent review is pending.

| ID | งาน | พึ่งพา | เกณฑ์เสร็จ |
|---|---|---|---|
| M0 | สำรวจ workspace/toolchain และ compatibility | local access | ยืนยัน path, Git state, versions และตัดสินใจ stack พร้อมหลักฐาน |
| M1 | สร้าง local foundation | M0 | shell + health ใช้งานได้โดยไม่มี credentials, checks ผ่าน, handoff พร้อม |
| M2 | เชื่อม Appwrite Auth | M1 + dev project/provider | login/logout/session expiry ผ่าน, ไม่มี bypass, rate-limit/CSRF policy มีผลจริง |
| M3 | เชื่อม PostgreSQL และ authorization | M2 + dev DB + permission decision | mapping และสิทธิ์ผ่าน tests; migration ตรวจสอบแล้ว; ไม่มี cross-user access |
| M4 | Business vertical slice แรก | requirements + M3 | ทำ workflow จริงครบต้นจนจบตาม acceptance ที่เจ้าของยืนยัน |
| M5 | Staging | target/authorization + checks | deploy revision ที่ระบุได้, smoke tests ผ่าน, rollback plan พร้อม |
| M6 | Production readiness | staging acceptance | owner decision, secrets separation, monitoring, restore rehearsal |

M0/M1 เป็นงานรอบแรก จบแล้วรายงานผลโดยไม่ขยายไปสร้าง cloud resource เอง
M2/M3 ทำตามการเชื่อมและสิทธิ์ที่เจ้าของให้ ไม่ใช่ขออนุญาตทุกการแก้โค้ด
หากเลือกทำ staging ของ foundation ก่อน M4 ให้บันทึก scope ชัดว่าไม่มี business features

## สถานะปัจจุบันและหลักฐาน
| งาน | สถานะ | หลักฐาน / งานต่อ |
|---|---|---|
| M0 | DONE (local/public compatibility) | workspace, clean base, exact registry pins/lockfile; actual hosting compatibility pending |
| M1 | DONE (local acceptance), review pending | shell + liveness without credentials, readiness 503, checks and handoff 0001 |
| M2 | BLOCKED | ไม่มี dev project/provider/credentials; ยังไม่ได้สร้าง login/logout |
| M3 | BLOCKED | ไม่มี dev DB/permission policy; ไม่สร้าง models/migrations |
| M4 | TODO | รอ use case และ acceptance จากเจ้าของ |
| M5/M6 | TODO | ไม่ได้รับ scope push/deploy/remote mutation ในรอบนี้ |
| Tooling maintenance | TODO | ติดตาม eslint-config-next plugins ที่รองรับ ESLint 10; ปัจจุบัน 9.39.4 deprecated แต่ peer-compatible |

Owner: Codex; branch `codex/m0-m1-foundation`; base `b4ee329`; no new commit.
Scope: source/config/tests/docs only. Evidence: `docs/handoffs/0001-m0-m1-foundation.md` and local review patch.

## Task template
ID / Goal / Owner / Branch / Allowed files / Dependencies / Acceptance criteria / Tests / Status / Evidence / Next action
สถานะ: TODO, IN_PROGRESS, BLOCKED, IN_REVIEW, DONE
DONE ต้องมี evidence และขอบเขตการทดสอบ ไม่ใช่แค่มีไฟล์อยู่
