"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
const menus=[
 {name:"Нүүр",href:"/"},
 {name:"Бидний тухай",href:"/about"},
 {name:"Сургалт",href:"/academics"},
 {name:"Тэнхимүүд",href:"/schools"},
 {name:"Судалгаа",href:"/research"},
 {name:"Мэдээ мэдээлэл",href:"/news"},
 {name:"Холбоо барих",href:"/contact"},
];
export default function Navbar(){
 const pathname=usePathname();
 const [open,setOpen]=useState(false);
 const active=(href:string)=>href==="/"?pathname==="/":pathname===href||pathname.startsWith(href+"/");
 return <nav className="relative z-50 bg-[#0D3154] text-white">
  <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
   <div className="hidden items-center gap-1 lg:flex">
    {menus.map(m=><Link key={m.href} href={m.href} aria-current={active(m.href)?"page":undefined} className={`relative inline-flex min-h-[60px] items-center px-4 text-[13px] font-semibold tracking-wide transition hover:text-[#F0CA89] ${active(m.href)?"text-[#F0CA89]":"text-white/90"}`}>{m.name}{active(m.href)&&<span className="absolute inset-x-4 bottom-0 h-[2px] bg-[#D3A35D]"/>}</Link>)}
   </div>
   <a href="http://khovd.num.edu.mn:5000/" target="_blank" rel="noopener noreferrer" className="hidden items-center gap-2 text-xs font-semibold text-[#EBC48B] hover:text-white lg:inline-flex">Албан ёсны сайт <ArrowUpRight size={15}/></a>
   <div className="flex w-full items-center justify-between py-3 lg:hidden"><span className="text-sm font-semibold tracking-wide">Үндсэн цэс</span><button type="button" onClick={()=>setOpen(!open)} aria-label={open?"Цэс хаах":"Цэс нээх"} aria-expanded={open} className="rounded border border-white/25 p-2">{open?<X size={22}/>:<Menu size={22}/>}</button></div>
  </div>
  {open&&<div className="border-t border-white/15 px-5 pb-4 lg:hidden"><div className="flex flex-col gap-1 pt-3">{menus.map(m=><Link key={m.href} href={m.href} onClick={()=>setOpen(false)} aria-current={active(m.href)?"page":undefined} className={`rounded px-3 py-3 text-sm font-semibold ${active(m.href)?"bg-white/15 text-[#F0CA89]":"text-white/90"}`}>{m.name}</Link>)}</div></div>}
 </nav>;
}