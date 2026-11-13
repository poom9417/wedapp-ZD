import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "wedapp-ZD | จุดเริ่มต้นของระบบ",
  description: "พื้นที่เริ่มต้นของ wedapp-ZD สำหรับเตรียมระบบและตรวจสอบการทำงาน",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
