import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, Mail } from "lucide-react";
// Дээд мөр ба сургуулийн лого: жижиг дэлгэц дээр ч эвтэйхэн харагдана.
export default function Header(){
 return <header className="bg-white">
  <div className="border-b border-slate-100 bg-[#f4f7f8]"><div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-2.5 text-xs font-medium text-[#476174] md:px-8">
   <span className="inline-flex items-center gap-1.5"><MapPin size={13}/> Ховд, Монгол Улс</span>
   <div className="flex gap-5"><Link href="/news" className="hover:text-[#0c5475]">Шинэ мэдээ</Link><Link href="/contact" className="inline-flex items-center gap-1.5 hover:text-[#0c5475]"><Mail size={13}/> Холбоо барих</Link></div>
  </div></div>
  <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-3 md:px-8 lg:flex-row lg:items-center lg:justify-between">
   <Link href="/" aria-label="Нүүр хуудас" className="relative block h-14 w-full max-w-[340px] sm:h-16"><Image src="/logo2.png" alt="МУИС-ийн Баруун бүсийн сургуулийн лого" fill priority sizes="(max-width:640px) 100vw,340px" className="object-contain object-left"/></Link>
   <div className="flex flex-wrap gap-3"><Link href="/admissions" className="inline-flex items-center gap-2 rounded-lg border border-[#d4dfe5] px-4 py-2.5 text-sm font-bold text-[#0a304e] transition hover:bg-[#f2f6f8]">Элсэлтийн мэдээлэл <ArrowUpRight size={17}/></Link>
    <a href="https://burtgel.num.edu.mn/bachelor/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-[#d5a354] px-4 py-2.5 text-sm font-bold text-[#082b46] transition hover:bg-[#ebbc6d]">Цахим бүртгэл <ArrowUpRight size={17}/></a></div>
  </div>
 </header>
}