
import type { Metadata } from "next";
import "./globals.css";

// Бидний өмнө хийсэн 3 хэсгийг оруулж ирнэ.
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Browser-ийн tab дээр харагдах нэр
export const metadata: Metadata = {
  title: "UNIVERSITY ONE",
  description: "Их сургуулийн мэдээллийн портал",
};

// Энэ нь вебийн бүх хуудсыг нэгтгэдэг хэсэг.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mn">
      <body className="bg-white text-slate-900">

        {/* Вебийн хамгийн дээд хэсэг */}
        <Header />

        {/* Вебийн үндсэн цэс */}
        <Navbar />

        {/* Нүүр хуудасны агуулга */}
        <main className="min-h-[60vh]">
          {children}
        </main>

        {/* Вебийн хамгийн доод хэсэг */}
        <Footer />

      </body>
    </html>
  );
}
