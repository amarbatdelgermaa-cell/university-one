import Link from "next/link";
import { ArrowUpRight, BookOpen, ClipboardCheck, GraduationCap, Mail, Phone, UserRoundCheck } from "lucide-react";
export const metadata = { title: "Элсэлт | МУИС-ийн Баруун бүсийн сургууль" };
const steps = [
  { title: "Бүртгэлийн мэдээлэл шалгах", description: "МУИС-ийн албан ёсны бүртгэлийн системээс тухайн элсэлтийн төрөл, хугацаа, шаардлагыг шалгана.", icon: BookOpen },
  { title: "Цахим бүртгэл үүсгэх", description: "Албан ёсны системд бүртгүүлж, өөрийн мэдээллийг үнэн зөв оруулна.", icon: ClipboardCheck },
  { title: "Хөтөлбөрөө сонгох", description: "Сонгох боломжтой хөтөлбөр, шалгалтын шаардлага болон төлбөрийн мэдээлэлтэй танилцана.", icon: GraduationCap },
  { title: "Элсэх эрхээ баталгаажуулах", description: "Элсэх эрх олгогдвол системийн зааврын дагуу баталгаажуулалт, бүртгэлээ дуусгана.", icon: UserRoundCheck },
];
export default function AdmissionsPage() {
 return <main className="min-h-screen bg-[#F8FAFD]">
  <section className="bg-[#103B69] px-5 py-16 text-white"><div className="mx-auto max-w-6xl">
    <p className="text-xs font-bold tracking-widest text-[#E9BE68]">ИРЭЭДҮЙН ОЮУТНУУДАД</p>
    <h1 className="mt-3 text-4xl font-bold">Элсэлтийн мэдээлэл</h1>
    <p className="mt-4 max-w-2xl leading-7 text-blue-100">МУИС-д элсэхэд шаардлагатай үндсэн алхам, цахим бүртгэл болон албан ёсны лавлагаа.</p>
    <a href="https://burtgel.num.edu.mn/bachelor/" target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-md bg-[#E8B85A] px-6 py-3 font-bold text-[#123C69]">Бакалаврын элсэлтийн систем <ArrowUpRight size={18}/></a>
  </div></section>
  <section className="mx-auto max-w-6xl px-5 py-12">
    <h2 className="mb-6 text-2xl font-bold text-[#123C69]">Элсэх үндсэн алхмууд</h2>
    <div className="grid gap-5 sm:grid-cols-2">{steps.map(({title,description,icon:Icon},i)=><article key={title} className="rounded-xl border border-slate-200 bg-white p-7">
      <div className="flex items-center justify-between"><Icon size={30} className="text-[#154E85]"/><span className="text-2xl font-bold text-[#D4B475]">0{i+1}</span></div>
      <h3 className="mt-5 text-lg font-bold text-[#123C69]">{title}</h3><p className="mt-3 leading-7 text-slate-600">{description}</p>
    </article>)}</div>
    <div className="mt-9 grid gap-5 md:grid-cols-2">
      <a href="https://burtgel.num.edu.mn/negdsen" target="_blank" rel="noopener noreferrer" className="rounded-xl bg-[#EAF1F8] p-7"><h3 className="text-xl font-bold text-[#123C69]">Нэгдсэн бүртгэлийн систем</h3><p className="mt-3 leading-7 text-slate-600">Орой, эчнээ, магистр, доктор болон бусад бүртгэлийн төрлийг шалгах.</p><span className="mt-4 inline-flex items-center gap-2 font-semibold text-blue-800">Систем нээх <ArrowUpRight size={18}/></span></a>
      <div className="rounded-xl border bg-white p-7"><h3 className="text-xl font-bold text-[#123C69]">Элсэлтийн лавлагаа</h3><p className="mt-3 flex items-center gap-2 text-slate-700"><Mail size={18}/> <a className="underline" href="mailto:elselt@num.edu.mn">elselt@num.edu.mn</a></p><p className="mt-3 flex items-center gap-2 text-slate-700"><Phone size={18}/> <a className="underline" href="tel:75754400">7575-4400</a></p><p className="mt-3 text-sm text-slate-500">МУИС-ийн төв элсэлтийн алба; дотуур 1122, 1123, 1381, 1343</p></div>
    </div>
    <p className="mt-7 text-sm leading-6 text-slate-500">Элсэлтийн хугацаа, хөтөлбөр, журам жил бүр өөрчлөгдөж болно. Бүртгэл нээлттэй эсэхийг албан ёсны системээс шалгана уу.</p>
    <Link href="/contact" className="mt-5 inline-block font-semibold text-[#154E85]">Бусад холбоо барих мэдээлэл →</Link>
  </section>
 </main>;
}