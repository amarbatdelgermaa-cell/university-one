
import Link from "next/link";

// Сургуулийн лого болон имэйлийн icon
import {
  GraduationCap,
  Mail,
} from "lucide-react";

// Facebook, Instagram-ийн icon
import {
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";

// Footer бол вебийн хамгийн доод хэсэг юм.
export default function Footer() {
  return (
    <footer className="bg-[#0F2948] text-white">

      {/* Footer-ийн үндсэн 3 багана */}
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-3">

        {/* 1-р багана: Сургуулийн мэдээлэл */}
        <div>

          {/* Сургуулийн малгайны зураг */}
          <GraduationCap
            size={38}
            className="mb-4 text-[#D8A650]"
          />

          {/* Сургуулийн нэр */}
          <h2 className="text-xl font-bold">
           МУИС-ийн Баруун бүсийн сургууль
          </h2>

          {/* Сургуулийн танилцуулга */}
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Их сургуулийн мэдээ мэдээлэл,
            сургалт, судалгаа, оюутны
            үйлчилгээний нэгдсэн портал.
          </p>
        </div>

        {/* 2-р багана: Хэрэгтэй холбоосууд */}
        <div>
          <h3 className="mb-5 text-lg font-bold">
            Хэрэгтэй холбоос
          </h3>

          {/* Холбоосуудыг доош нь жагсаана */}
          <div className="flex flex-col gap-3 text-sm text-slate-300">

            <Link href="/" className="hover:text-[#D8A650]">
              Нүүр хуудас
            </Link>

            <Link href="/news" className="hover:text-[#D8A650]">
              Мэдээ мэдээлэл
            </Link>

            <Link href="/library" className="hover:text-[#D8A650]">
              Номын сан
            </Link>

            <Link href="/schools" className="hover:text-[#D8A650]">
              Тэнхимүүд
            </Link>

            <Link href="/admissions" className="hover:text-[#D8A650]">
              Элсэлт
            </Link>

            <Link href="/contact" className="hover:text-[#D8A650]">
              Холбоо барих
            </Link>

          </div>
        </div>

        {/* 3-р багана: Сошиал холбоосууд */}
        <div>
          <h3 className="mb-5 text-lg font-bold">
            Бидэнтэй холбогдох
          </h3>

          {/* Icon-уудыг зэрэгцүүлж байрлуулна */}
          <div className="flex items-center gap-5">

            {/* Facebook */}
            <a
              href="https://www.facebook.com/MUIS1942"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-[#D8A650]"
            >
              <FaFacebookF size={23} />
            </a>

            {/* Instagram */}
            <a
              href="https://news.num.edu.mn/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="МУИС-ийн мэдээ"
              className="hover:text-[#D8A650]"
            >
              <Mail size={23} />
            </a>

            {/* Холбоо барих хуудас */}
            <Link
              href="/contact"
              aria-label="Холбоо барих"
              className="hover:text-[#D8A650]"
            >
              <Mail size={23} />
            </Link>

          </div>

          {/* Нэмэлт мэдээлэл */}
          <p className="mt-6 text-sm leading-7 text-slate-300">
            МУИС-ийн төвийн элсэлтийн алба: elselt@num.edu.mn, 7575-4400.\n            Сургуулийн албан ёсны вебээр холбогдож,
            сургуулийн шинэ мэдээ мэдээллийг
            цаг тухайд нь аваарай.
          </p>
        </div>
      </div>

      {/* Footer-ийн хамгийн доод зурвас */}
      <div className="border-t border-white/20 px-6 py-5 text-center">

        {/* Он автоматаар шинэчлэгдэнэ */}
        <p className="text-sm text-slate-300">
{/* Он болон сургуулийн нэр */}
© 2026 МУИС-ийн Баруун бүсийн сургууль.          Бүх эрх хуулиар хамгаалагдсан.
        </p>

      </div>
    </footer>
  );
}
