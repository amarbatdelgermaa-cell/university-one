import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap, Users } from "lucide-react";

// Сургуулийн танилцуулгын хуудас
export const metadata = { title: "Бидний тухай | МУИС-ийн Баруун бүсийн сургууль" };

export default function AboutPage() {
  return <main className="min-h-screen bg-slate-50">
    <section className="bg-[#07347C] px-5 py-16 text-white">
      <div className="mx-auto max-w-6xl">
        <p className="font-semibold text-[#F7BC32]">МУИС • БАРУУН БҮС</p>
        <h1 className="mt-3 text-4xl font-extrabold">Бидний тухай</h1>
        <p className="mt-4 max-w-3xl text-blue-100">МУИС-ийн Баруун бүсийн сургуулийн сургалт, судалгаа, оюутны амьдралтай танилцаарай.</p>
      </div>
    </section>
    <section className="mx-auto grid max-w-6xl gap-6 px-5 py-12 md:grid-cols-3">
      {[
        { title: "Сургалт", text: "Сургалтын хөтөлбөр, суралцах боломжийн мэдээлэл", icon: GraduationCap, href: "/academics" },
        { title: "Эрдэм шинжилгээ", text: "Судалгаа, төсөл, шинэлэг санаачилгын мэдээлэл", icon: BookOpen, href: "/research" },
        { title: "Оюутны мэдээлэл", text: "Оюутанд зориулсан мэдээ болон сургуулийн үйл ажиллагаа", icon: Users, href: "/news" },
      ].map(({title,text,icon:Icon,href}) => <Link key={title} href={href} className="rounded-2xl border bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
        <Icon className="text-[#07347C]" size={36}/><h2 className="mt-5 text-xl font-bold text-[#07347C]">{title}</h2>
        <p className="mt-3 text-slate-600">{text}</p><span className="mt-6 inline-flex items-center gap-2 font-semibold text-blue-700">Дэлгэрэнгүй <ArrowRight size={16}/></span>
      </Link>)}
    </section>
    <section className="mx-auto max-w-6xl px-5 pb-16">
      <div className="rounded-2xl border bg-white p-8">
        <h2 className="text-2xl font-bold text-[#07347C]">Сургуулийн мэдээлэл нэг дор</h2>
        <p className="mt-3 leading-7 text-slate-700">Сургалт, элсэлт, тэнхимүүд, судалгаа, мэдээ мэдээлэл болон холбоо барих хэсгүүдийг энэ вебээс үзэх боломжтой. Мэдээллийг баталгаажсан эх сурвалжид тулгуурлан шинэчилнэ.</p>
        <Link href="/contact" className="mt-5 inline-flex items-center gap-2 text-blue-700 underline">Холбоо барих <ArrowRight size={16}/></Link>
      </div>
    </section>
  </main>;
}