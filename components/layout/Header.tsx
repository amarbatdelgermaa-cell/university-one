
import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { Search, Globe, Mail, Phone } from "lucide-react";

// Вебийн хамгийн дээд хэсэг
export default function Header() {
  return (
    <header className="w-full">

      {/* 1. Дээд талын жижиг мэдээллийн мөр */}
      <div className="bg-[#06152D] text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-5 py-2 text-xs">

          {/* Сургуулийн танилцуулга */}
          <span className="text-[#D4AF37]">
            Мэдлэг • Хөгжил • Ирээдүй
          </span>

          {/* Холбоо барих болон хэлний хэсэг */}
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="flex items-center gap-1 hover:text-[#D4AF37]"
            >
              <Phone size={13} />
              Холбоо барих
            </Link>

            <Link
              href="/contact"
              className="flex items-center gap-1 hover:text-[#D4AF37]"
            >
              <Mail size={13} />
              И-мэйл
            </Link>

            <span className="flex items-center gap-1 text-[#D4AF37]">
              <Globe size={13} />
              MN
            </span>
          </div>
        </div>
      </div>

      {/* 2. Лого болон сургуулийн нэр */}
      <div className="border-b-2 border-[#D4AF37] bg-[#071B38]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5">

          {/* Лого болон сургуулийн нэр */}
          <Link
            href="/"
            className="flex min-w-0 items-center gap-4"
          >
            {/* Сургуулийн лого */}
<div className="flex h-[100px] w-[100px] shrink-0 items-center justify-center rounded-full border-2 border-[#D4AF37] bg-white p-1 shadow-lg">
  <GraduationCap size={52} className="text-[#07347C]" aria-label="Сургуулийн таних тэмдэг" />
</div>
            {/* Сургуулийн нэр */}
            <div className="min-w-0">
              <p className="text-xs font-bold tracking-[0.15em] text-[#D4AF37] sm:text-sm">
                МОНГОЛ УЛСЫН ИХ СУРГУУЛЬ
              </p>

              <h1 className="mt-1 text-lg font-extrabold leading-tight text-white sm:text-2xl lg:text-3xl">
                Баруун бүсийн их сургууль
              </h1>

              <p className="mt-1 text-xs text-gray-300">
                Боловсрол • Судалгаа • Инновац
              </p>
            </div>
          </Link>

          {/* Хайлт */}
          <Link
            href="/search"
            aria-label="Хайлт"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/60 text-[#D4AF37] transition hover:bg-[#D4AF37] hover:text-[#071B38]"
          >
            <Search size={21} />
          </Link>
        </div>
      </div>
    </header>
  );
}
