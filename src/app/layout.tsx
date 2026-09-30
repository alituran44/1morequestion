import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "1morequestion | İngilizce Sınav Simülatörü & Adaptif Soru Havuzu",
  description: "YDT, YDS, YÖKDİL, IELTS ve TOEFL için Wayground tarzı AI Deneme Stüdyosu, online deneme pazarı ve adaptif '1 Soru Daha' öğrenme ekosistemi.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="min-h-screen bg-[#f8fafc] text-slate-900 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
