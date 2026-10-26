import Link from "next/link";
import { ArrowUpRight, GraduationCap, MapPin, Mail } from "lucide-react";
// Хуудас бүрийн доод хэсэгт нэг ижил холбоос, мэдээлэл гарна.
export default function Footer(){
 return <footer className="bg-[#082b46] text-white">
  <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[1.5fr_1fr_1fr] md:px-8">
   <div><span className="inline-flex rounded-2xl bg-white/10 p-3 text-[#e5b75f]"><GraduationCap size={30}/></span><h2 className="mt-5 max-w-sm text-2xl font-extrabold leading-snug">МУИС-ийн Баруун бүсийн сургууль</h2><p className="mt-4 max-w-sm text-sm leading-7 text-white/65">Сургалт, судалгаа, оюутны амьдрал, мэдээ мэдээллийг нэг дороос.</p><p className="mt-5 inline-flex items-center gap-2 text-sm text-white/75"><MapPin size={17}/> Ховд, Монгол Улс</p></div>
   <div><h3 className="text-sm font-extrabold uppercase tracking-widest text-[#e5b75f]">Түргэн холбоос</h3><div className="mt-6 grid gap-3 text-sm text-white/75">{[{t:"Бидний тухай",h:"/about"},{t:"Сургалт",h:"/academics"},{t:"Тэнхимүүд",h:"/schools"},{t:"Судалгаа",h:"/research"},{t:"Номын сан",h:"/library"}].map(x=><Link key={x.h} href={x.h} className="transition hover:text-white">{x.t}</Link>)}</div></div>
   <div><h3 className="text-sm font-extrabold uppercase tracking-widest text-[#e5b75f]">Мэдээлэл</h3><div className="mt-6 grid gap-3 text-sm text-white/75"><Link href="/news" className="hover:text-white">Мэдээ мэдээлэл</Link><Link href="/archive" className="hover:text-white">Мэдээний архив</Link><Link href="/admissions" className="hover:text-white">Элсэлт</Link><Link href="/contact" className="hover:text-white">Холбоо барих</Link><a href="https://burtgel.num.edu.mn/bachelor/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white">Цахим бүртгэл <ArrowUpRight size={15}/></a><a href="mailto:elselt@num.edu.mn" className="inline-flex items-center gap-2 hover:text-white"><Mail size={15}/> elselt@num.edu.mn</a></div></div>
  </div>
  <div className="border-t border-white/15"><div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3 px-6 py-6 text-xs text-white/55 md:px-8"><span>© 2026 МУИС-ийн Баруун бүсийн сургууль</span><span>Сургуулийн мэдээллийн веб төсөл</span></div></div>
 </footer>
}