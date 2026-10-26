import Link from "next/link";
import { ArrowRight, BookOpen, FlaskConical, Lightbulb } from "lucide-react";
export const metadata = { title: "Судалгаа | МУИС-ийн Баруун бүсийн сургууль" };
export default function ResearchPage() {
  return <main className="min-h-screen bg-slate-50">
    <section className="bg-[#07347C] px-5 py-14 text-white"><div className="mx-auto max-w-6xl"><p className="font-bold text-[#F7BC32]">ЭРДЭМ ШИНЖИЛГЭЭ</p><h1 className="mt-3 text-4xl font-bold">Судалгаа, инновац</h1><p className="mt-4 max-w-3xl text-blue-100">Сургуулийн судалгаа, төсөл, эрдэм шинжилгээний мэдээллийг танилцуулах хэсэг.</p></div></section>
    <section className="mx-auto grid max-w-6xl gap-6 px-5 py-12 md:grid-cols-3">
    {[
      {title:"Эрдэм шинжилгээ",text:"Багш, судлаачдын эрдэм шинжилгээний үйл ажиллагааны мэдээлэл.",icon:BookOpen},
      {title:"Төсөл, хамтын ажиллагаа",text:"Хэрэгжүүлж буй болон төлөвлөж буй төслүүдийн мэдээлэл.",icon:FlaskConical},
      {title:"Инновац",text:"Шинэ санаа, шийдэл, бүтээлийн танилцуулга.",icon:Lightbulb},
    ].map(({title,text,icon:Icon})=><article key={title} className="rounded-2xl border bg-white p-7 shadow-sm"><Icon className="text-[#07347C]" size={34}/><h2 className="mt-5 text-xl font-bold text-[#07347C]">{title}</h2><p className="mt-3 leading-7 text-slate-600">{text}</p></article>)}
    </section>
    <div className="mx-auto max-w-6xl px-5 pb-16"><Link href="/news" className="inline-flex items-center gap-2 font-bold text-blue-800">Судалгааны холбоотой мэдээ <ArrowRight size={17}/></Link></div>
  </main>;
}