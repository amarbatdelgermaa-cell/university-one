"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
const menus=[{name:"Нүүр",href:"/"},{name:"Бидний тухай",href:"/about"},{name:"Сургалт",href:"/academics"},{name:"Тэнхимүүд",href:"/schools"},{name:"Судалгаа",href:"/research"},{name:"Мэдээ",href:"/news"},{name:"Элсэлт",href:"/admissions"},{name:"Холбоо барих",href:"/contact"}];
// Идэвхтэй хуудасны цэсийг ялгаж, утасны цэсийг товчоор нээнэ.
export default function Navbar(){
 const pathname=usePathname();const [open,setOpen]=useState(false);
 const active=(href:string)=>href==="/"?pathname==="/":pathname===href||pathname.startsWith(href+"/");
 return <nav className="relative z-50 border-t border-white/10 bg-[#082b46] text-white">
  <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
   <div className="hidden w-full items-center justify-between lg:flex">{menus.map(m=><Link key={m.href} href={m.href} aria-current={active(m.href)?"page":undefined} className={`relative flex min-h-16 items-center px-3 text-[13px] font-bold transition hover:text-[#e5b75f] ${active(m.href)?"text-[#e5b75f]":"text-white/85"}`}>{m.name}{active(m.href)&&<span className="absolute inset-x-3 bottom-0 h-[3px] rounded-t-full bg-[#e5b75f]"/>}</Link>)}</div>
   <div className="flex w-full items-center justify-between py-3 lg:hidden"><span className="text-sm font-bold">Үндсэн цэс</span><button type="button" aria-label={open?"Цэс хаах":"Цэс нээх"} aria-expanded={open} onClick={()=>setOpen(!open)} className="rounded-lg border border-white/20 p-2">{open?<X size={22}/>:<Menu size={22}/>}</button></div>
  </div>
  {open&&<div className="border-t border-white/15 px-5 pb-5 lg:hidden"><div className="grid gap-1 pt-3">{menus.map(m=><Link key={m.href} href={m.href} onClick={()=>setOpen(false)} className={`rounded-lg px-4 py-3 text-sm font-semibold ${active(m.href)?"bg-white/15 text-[#e5b75f]":"text-white/85"}`}>{m.name}</Link>)}</div></div>}
 </nav>
}