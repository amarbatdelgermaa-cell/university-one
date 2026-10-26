import Link from "next/link";
import { ArrowRight } from "lucide-react";
export const metadata={title:"Судалгаа | МУИС-ийн Баруун бүсийн сургууль"};
// Нэгдсэн загвар: зурагтай танилцуулга болон хэрэгтэй холбоосууд.
export default function Page(){const cards=[{"title":"Судалгааны мэдээ","description":"Шинэ мэдээ, мэдээлэл","href":"/news"},{"title":"Тэнхимүүд","description":"Судалгааны чиглэлтэй танилцах","href":"/schools"},{"title":"Сургалт","description":"Суралцах боломжууд","href":"/academics"}];return <main className="min-h-screen bg-[#f5f7f8]">
 <section className="relative isolate min-h-[430px] overflow-hidden bg-[#082b46] text-white">
  <img src="/research.webp" alt="" className="absolute inset-0 -z-20 h-full w-full object-cover"/>
  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#082b46]/95 via-[#082b46]/75 to-[#082b46]/25"/>
  <div className="mx-auto flex min-h-[430px] max-w-7xl flex-col justify-center px-6 py-20 md:px-8">
   <p className="text-xs font-extrabold tracking-[.24em] text-[#e5b75f]">МУИС • БАРУУН БҮСИЙН СУРГУУЛЬ</p>
   <h1 className="mt-5 text-5xl font-black tracking-tight md:text-7xl">Судалгаа</h1>
   <p className="mt-6 max-w-xl text-lg leading-8 text-white/85">Эрдэм шинжилгээ, хамтын ажиллагаа, шинэ санааны орчин.</p>
  </div>
 </section>
 <section className="mx-auto max-w-7xl px-6 py-20 md:px-8"><p className="site-kicker">ТАНД ХЭРЭГТЭЙ</p><h2 className="site-title mt-3">Мэдээлэлтэй танилцах</h2>
 <div className="mt-10 grid gap-6 md:grid-cols-3">{cards.map((item,index)=><Link key={item.href} href={item.href} className="site-card group flex min-h-64 flex-col p-8 transition duration-300 hover:-translate-y-1"><span className="text-sm font-extrabold text-[#bd8e42]">0{index+1} / 03</span><h3 className="mt-8 text-2xl font-extrabold text-[#0a304e]">{item.title}</h3><p className="mt-3 leading-7 text-slate-600">{item.description}</p><span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-[#0a304e]">Дэлгэрэнгүй <ArrowRight size={17} className="transition group-hover:translate-x-1"/></span></Link>)}</div>
 </section>
 <section className="bg-[#eaf0f3] px-6 py-16 md:px-8"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6"><div><h2 className="text-2xl font-extrabold text-[#0a304e]">Дэлгэрэнгүй мэдээлэл хэрэгтэй юу?</h2><p className="mt-3 text-slate-600">Холбоо барих хэсгээр дамжуулан мэдээлэл аваарай.</p></div><Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-[#082b46] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#16557b]">Холбоо барих <ArrowRight size={18}/></Link></div></section>
 </main>}