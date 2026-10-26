import Image from "next/image";
import Link from "next/link";
import { ClipboardList, GraduationCap, LogIn, Mail, Phone } from "lucide-react";

// Сургуулийн үндсэн толгой хэсэг: албан ёсны логоны файлыг public/logo2.png-д байрлуулна.
export default function Header() {
  return (
    <header className="w-full bg-white">
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-xs font-medium text-[#07347C]">
          <span>Мэдлэг • Хөгжил • Ирээдүй</span>
          <div className="flex items-center gap-4">
            <Link href="/news" className="hover:underline">Мэдээ</Link>
            <Link href="/contact" className="flex items-center gap-1 hover:underline"><Phone size={13}/> Холбоо барих</Link>
            <Link href="/contact" className="flex items-center gap-1 hover:underline"><Mail size={13}/> И-мэйл</Link>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-6 lg:flex-row lg:items-center lg:justify-between">
        <Link href="/" className="relative block h-[104px] w-full max-w-[540px] shrink-0 sm:h-[125px]" aria-label="МУИС-ийн Баруун бүсийн сургууль — Нүүр хуудас">
          <Image src="/logo2.png" alt="Монгол Улсын Их Сургууль — Баруун бүсийн сургууль" fill sizes="(max-width: 640px) 100vw, 540px" className="object-contain object-left" priority />
        </Link>
        <div className="flex flex-wrap gap-2">
          <Link href="/admissions" className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-red-700"><GraduationCap size={17}/> ЭЛСЭЛТИЙН МЭДЭЭЛЭЛ</Link>
          <Link href="/admissions" className="inline-flex items-center gap-2 rounded-lg bg-[#F7BC32] px-4 py-3 text-sm font-bold text-[#07347C] transition hover:bg-amber-400"><ClipboardList size={17}/> ЦАХИМ БҮРТГЭЛ</Link>
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700"><LogIn size={17}/> ХОЛБОО БАРИХ</Link>
        </div>
      </div>
    </header>
  );
}
