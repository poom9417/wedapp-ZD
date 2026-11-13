import Link from "next/link";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">ข้ามไปเนื้อหาหลัก</a>
      <div className="page-shell">
        <header className="site-header">
          <Link className="brand" href="/" aria-label="wedapp-ZD หน้าเริ่มต้น">
            <span className="brand-mark" aria-hidden="true">ZD</span>
            <span>wedapp-ZD</span>
          </Link>
          <span className="stage-label">ระยะเริ่มต้น · Foundation</span>
        </header>

        <main id="main">
          <section className="intro" aria-labelledby="welcome-title">
            <p className="eyebrow">พื้นที่เริ่มต้นของระบบ</p>
            <h1 id="welcome-title">เตรียมพื้นฐาน<br />ให้พร้อมสำหรับก้าวต่อไป</h1>
            <p className="intro-copy">
              ยินดีต้อนรับสู่ wedapp-ZD ขณะนี้อยู่ในขั้นเตรียมระบบ
              คุณสามารถตรวจสอบการตอบสนองของเว็บได้จากหน้านี้
            </p>
            <a className="primary-link" href="/api/health">
              ตรวจสอบการทำงานของเว็บ <span aria-hidden="true">↗</span>
            </a>
            <p className="link-hint">เปิดผลตรวจการตอบสนองของเว็บในรูปแบบ JSON</p>
          </section>

          <section className="status-section" aria-labelledby="status-title">
            <div className="section-heading">
              <h2 id="status-title">สถานะการเตรียมระบบ</h2>
              <span>Foundation · M1</span>
            </div>
            <div className="status-grid">
              <article className="status-card">
                <div className="card-heading"><span className="step">01</span><span className="badge available">เปิดใช้งานแล้ว</span></div>
                <h3>หน้าเริ่มต้น</h3>
                <p>หน้าเว็บและการตรวจการตอบสนองทำงานได้ โดยไม่ต้องเชื่อมบริการภายนอก</p>
              </article>
              <article className="status-card">
                <div className="card-heading"><span className="step">02</span><span className="badge pending">ยังไม่ได้เชื่อม</span></div>
                <h3>การเข้าสู่ระบบ</h3>
                <p>ยังไม่เปิดให้เข้าสู่ระบบ ต้องเชื่อมและทดสอบบริการยืนยันตัวตนก่อนใช้งาน</p>
              </article>
              <article className="status-card">
                <div className="card-heading"><span className="step">03</span><span className="badge pending">ยังไม่ได้เชื่อม</span></div>
                <h3>ฐานข้อมูล</h3>
                <p>ยังไม่ได้เชื่อมต่อฐานข้อมูล และยังไม่มีข้อมูลจริงให้เรียกดูจากหน้านี้</p>
              </article>
            </div>
            <aside className="notice">
              <div><h3>กำลังเตรียมความพร้อม</h3><p>ผลตรวจเว็บที่สำเร็จยืนยันเฉพาะการตอบสนองของเว็บ ส่วนการเข้าสู่ระบบและฐานข้อมูลยังอยู่ระหว่างเตรียมการ</p></div>
              <a href="/api/ready">ดูสถานะความพร้อม <span aria-hidden="true">↗</span></a>
            </aside>
          </section>
        </main>

        <footer><span>wedapp-ZD</span><p>พื้นฐานสำหรับการพัฒนาขั้นถัดไป</p></footer>
      </div>
    </>
  );
}
