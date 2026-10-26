
import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";

// Бидний өмнө хийсэн 3 хэсгийг оруулж ирнэ.
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Browser-ийн tab дээр харагдах нэр
export const metadata: Metadata = {
  title: "МУИС-ийн Баруун бүсийн сургууль | Оюутны төсөл",
  description: "МУИС-ийн Баруун бүсийн сургуулийн мэдээ, сургалт, судалгааны мэдээллийн портал — оюутны бие даалтын төсөл",
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
        <Suspense fallback={<div className="h-[67px] bg-[#07347C]" />}>
          <Navbar />
        </Suspense>

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
