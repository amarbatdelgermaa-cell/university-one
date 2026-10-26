import Link from "next/link";
import { ArrowRight, Building2, GraduationCap } from "lucide-react";
export const metadata = { title: "Тэнхимүүд | МУИС-ийн Баруун бүсийн сургууль" };
export default function SchoolsPage() {
  return <main className="min-h-screen bg-slate-50">
    <section className="bg-[#07347C] px-5 py-14 text-white"><div className="mx-auto max-w-6xl"><p className="font-bold text-[#F7BC32]">СУРГУУЛИЙН БҮТЭЦ</p><h1 className="mt-3 text-4xl font-bold">Салбар, тэнхимүүд</h1><p className="mt-4 max-w-3xl text-blue-100">Сургуулийн бүтэц, сургалт зохион байгуулдаг нэгжүүдийн танилцуулга.</p></div></section>
    <section className="mx-auto max-w-6xl px-5 py-12"><div className="rounded-2xl border bg-white p-8 shadow-sm">
      <div className="flex items-start gap-4"><Building2 size={38} className="shrink-0 text-[#07347C]"/><div>
        <h2 className="text-2xl font-bold text-[#07347C]">Тэнхимүүдийн мэдээлэл</h2>
        <p className="mt-3 leading-7 text-slate-600">Тэнхимүүдийн албан ёсны нэр, танилцуулга, сургалтын хөтөлбөр болон холбоо барих мэдээллийг баталгаажуулсны дараа энд оруулна.</p>
      </div></div>
    </div><Link href="/academics" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#F7BC32] px-6 py-3 font-bold text-[#07347C]"><GraduationCap size={19}/> Сургалтын хэсэг <ArrowRight size={16}/></Link></section>
  </main>;
}