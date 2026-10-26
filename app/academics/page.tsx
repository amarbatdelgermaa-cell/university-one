import Link from "next/link";
import { ArrowRight, BookOpen, CalendarDays, GraduationCap } from "lucide-react";

export const metadata = { title: "Сургалт | МУИС-ийн Баруун бүсийн сургууль" };
export default function AcademicsPage() {
  return <main className="min-h-screen bg-slate-50">
    <section className="bg-[#07347C] px-5 py-14 text-white"><div className="mx-auto max-w-6xl">
      <p className="text-sm font-bold text-[#F7BC32]">СУРГАЛТЫН МЭДЭЭЛЭЛ</p><h1 className="mt-3 text-4xl font-bold">Сургалт</h1>
      <p className="mt-4 max-w-3xl text-blue-100">Сургалтын үйл ажиллагаа, хөтөлбөр, оюутанд хэрэгтэй мэдээллийн төвлөрсөн хэсэг.</p>
    </div></section>
    <section className="mx-auto grid max-w-6xl gap-6 px-5 py-12 md:grid-cols-3">
      {[
        { title: "Сургалтын хөтөлбөр", text: "Сургалтын хөтөлбөрийн талаарх баталгаажсан мэдээллийг энд байршуулна.", icon: GraduationCap },
        { title: "Хичээлийн мэдээлэл", text: "Улирал, хуваарь болон сургалтын зарлалыг оюутнуудад хүргэнэ.", icon: CalendarDays },
        { title: "Оюутны дэмжлэг", text: "Суралцахад хэрэгтэй заавар, эх сурвалж, мэдээллийг нэгтгэнэ.", icon: BookOpen },
      ].map(({title,text,icon:Icon})=><article key={title} className="rounded-2xl border bg-white p-7 shadow-sm"><Icon size={34} className="text-blue-800"/>
        <h2 className="mt-5 text-xl font-bold text-[#07347C]">{title}</h2><p className="mt-3 leading-7 text-slate-600">{text}</p>
      </article>)}
    </section>
    <div className="mx-auto max-w-6xl px-5 pb-16"><Link href="/news" className="inline-flex items-center gap-2 rounded-full bg-[#F7BC32] px-6 py-3 font-semibold text-[#07347C]">Сургалтын мэдээ үзэх <ArrowRight size={17}/></Link></div>
  </main>;
}