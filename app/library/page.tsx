import Link from "next/link";
import { ArrowUpRight, BookOpen, GraduationCap, Globe, Newspaper } from "lucide-react";
export const metadata = { title: "Номын сан | МУИС-ийн Баруун бүсийн сургууль" };
export default function LibraryPage(){
 return <main className="min-h-screen bg-[#F8FAFD]">
 <section className="bg-[#103B69] px-5 py-16 text-white"><div className="mx-auto max-w-6xl"><p className="text-xs font-bold tracking-widest text-[#E9BE68]">ОЮУТНЫ ҮЙЛЧИЛГЭЭ</p><h1 className="mt-3 text-4xl font-bold">Номын сан, суралцах орчин</h1><p className="mt-4 max-w-2xl leading-7 text-blue-100">Сургуулийн номын сан, оюутны үйлчилгээ, сургалтын мэдээлэлтэй холбогдох хэсэг.</p></div></section>
 <section className="mx-auto max-w-6xl px-5 py-12"><div className="grid gap-5 md:grid-cols-3">
 {[
 {title:"Номын сан",text:"МУИС-ийн Баруун бүсийн сургууль номын сангийн үйлчилгээтэй. Ажиллах цаг, каталогийн баталгаатай холбоосыг албан ёсны сайтаас шалгана.",href:"http://khovd.num.edu.mn:5000/",icon:BookOpen},
 {title:"Оюутны хөгжлийн үйлчилгээ",text:"МУИС-ийн оюутны хөгжлийн үйлчилгээний баг 2024 онд Баруун бүсийн сургуульд ажиллаж, суралцагчдад мэдээлэл хүргэсэн.",href:"https://news.num.edu.mn/?p=106756",icon:GraduationCap},
 {title:"Мэдээ, зарлал",text:"Оюутны үйл ажиллагаа, сургалтын зарлал болон бусад шинэ мэдээллийг мэдээний хэсгээс үзнэ.",href:"/news",icon:Newspaper}
 ].map(({title,text,href,icon:Icon})=><article key={title} className="rounded-xl border bg-white p-7"><Icon size={32} className="text-[#154E85]"/><h2 className="mt-5 text-xl font-bold text-[#123C69]">{title}</h2><p className="mt-3 leading-7 text-slate-600">{text}</p>{href.startsWith("/")?<Link href={href} className="mt-5 inline-flex items-center gap-2 font-semibold text-blue-800">Дэлгэрэнгүй <ArrowUpRight size={17}/></Link>:<a href={href} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 font-semibold text-blue-800">Эх сурвалж <ArrowUpRight size={17}/></a>}</article>)}</div>
 <div className="mt-8 rounded-xl bg-[#EAF1F8] p-7"><Globe className="text-[#154E85]"/><h2 className="mt-3 text-xl font-bold text-[#123C69]">Албан ёсны мэдээлэл</h2><p className="mt-3 text-slate-600">Номын сангийн цагийн хуваарь болон үйлчилгээний нөхцөлийг баталгаажаагүй тул энд зохиомлоор оруулаагүй.</p></div>
 </section></main>;
}