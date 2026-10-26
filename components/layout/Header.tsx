import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";

// Лого ба гол үйлдлүүдийг цэвэрхэн, албан ёсны хэв маягаар байрлуулна.
export default function Header() {
 return <header className="w-full bg-white">
  <div className="border-b border-slate-200 bg-[#F7F8FA]">
   <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-2 text-[11px] font-semibold tracking-wide text-[#41536B] md:px-8">
    <span className="inline-flex items-center gap-1.5"><MapPin size={13}/> Ховд аймаг, Монгол Улс</span>
    <div className="flex items-center gap-5"><Link href="/news" className="hover:text-[#0A416A]">Мэдээ</Link><Link href="/contact" className="inline-flex items-center gap-1.5 hover:text-[#0A416A]"><Mail size={13}/> Холбоо барих</Link></div>
   </div>
  </div>
  <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-5 md:px-8 lg:flex-row lg:items-center lg:justify-between">
   <Link href="/" className="relative block h-[86px] w-full max-w-[470px] sm:h-[100px]" aria-label="МУИС-ийн Баруун бүсийн сургууль">
    <Image src="/logo2.png" alt="МУИС-ийн Баруун бүсийн сургуулийн лого" fill priority sizes="(max-width: 640px) 100vw, 470px" className="object-contain object-left"/>
   </Link>
   <div className="flex flex-wrap items-center gap-3">
    <Link href="/admissions" className="inline-flex items-center justify-center gap-2 rounded-md border border-[#C8D1DA] px-5 py-3 text-sm font-semibold text-[#103B69] transition hover:border-[#103B69] hover:bg-[#F1F5F9]">Элсэлтийн мэдээлэл <ArrowUpRight size={17}/></Link>
    <a href="https://burtgel.num.edu.mn/bachelor/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-md bg-[#B88A45] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#9B7136]">Цахим бүртгэл <ArrowUpRight size={17}/></a>
   </div>
  </div>
 </header>;
}