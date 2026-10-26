import Link from "next/link";
import { ArrowUpRight, Globe, Mail, MapPin, Phone, GraduationCap } from "lucide-react";

export const metadata = { title: "Холбоо барих | МУИС-ийн Баруун бүсийн сургууль" };

// Эх сурвалж: МУИС-ийн албан ёсны элсэлтийн холбоо барих мэдээлэл.
// Ховд дахь сургуулийн баталгаажаагүй дугаар, имэйл зохиож оруулаагүй.
const contacts = [
  { title: "МУИС-ийн элсэлтийн и-мэйл", detail: "elselt@num.edu.mn", href: "mailto:elselt@num.edu.mn", icon: Mail, note: "МУИС-ийн төв элсэлтийн алба" },
  { title: "МУИС-ийн төв утас", detail: "7575-4400", href: "tel:75754400", icon: Phone, note: "Элсэлтийн лавлагаа: дотуур 1122, 1123, 1381, 1343" },
  { title: "Баруун бүсийн сургууль", detail: "Ховд аймаг, Монгол Улс", href: "http://khovd.num.edu.mn:5000/", icon: MapPin, note: "Сургуулийн албан ёсны веб хуудас" },
];
export default function ContactPage() {
  return <main className="min-h-screen bg-[#F8FAFD]">
    <section className="bg-[#103B69] px-5 py-16 text-white"><div className="mx-auto max-w-6xl">
      <p className="text-xs font-bold tracking-widest text-[#E9BE68]">ТАНД ТУСЛАХ МЭДЭЭЛЭЛ</p>
      <h1 className="mt-3 text-4xl font-bold">Холбоо барих</h1>
      <p className="mt-4 max-w-2xl leading-7 text-blue-100">Сургуулийн мэдээлэл, элсэлтийн лавлагаа болон албан ёсны цахим холбоосууд.</p>
    </div></section>
    <section className="mx-auto max-w-6xl px-5 py-12">
      <div className="grid gap-5 md:grid-cols-3">
        {contacts.map(({title,detail,href,icon:Icon,note})=><a key={title} href={href} target={href.startsWith("http")?"_blank":undefined} rel={href.startsWith("http")?"noopener noreferrer":undefined} className="group rounded-xl border border-slate-200 bg-white p-7 transition hover:border-blue-300 hover:shadow-lg">
          <Icon size={30} className="text-[#154E85]"/><h2 className="mt-5 font-bold text-[#123C69]">{title}</h2>
          <p className="mt-3 break-words text-lg font-semibold text-slate-900">{detail}</p>
          <p className="mt-3 text-sm leading-6 text-slate-500">{note}</p><ArrowUpRight size={18} className="mt-5 text-[#B88329]"/>
        </a>)}
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <a href="https://burtgel.num.edu.mn/negdsen/Admission" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 rounded-xl bg-[#EAF1F8] p-7 text-[#123C69]"><GraduationCap size={30}/><div><h2 className="text-xl font-bold">Элсэлтийн албан ёсны лавлагаа</h2><p className="mt-2 leading-7">Элсэлтийн бүртгэл, заавар, холбоо барих мэдээллийг МУИС-ийн бүртгэлийн системээс үзэх.</p><span className="mt-4 inline-flex items-center gap-2 font-semibold">Нээх <ArrowUpRight size={17}/></span></div></a>
        <a href="http://khovd.num.edu.mn:5000/" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 rounded-xl border bg-white p-7 text-[#123C69]"><Globe size={30}/><div><h2 className="text-xl font-bold">Ховд сургуулийн албан ёсны сайт</h2><p className="mt-2 leading-7 text-slate-600">Сургуулийн шууд холбоо барих мэдээлэл болон албан мэдээг эх сурвалжаас шалгах.</p><span className="mt-4 inline-flex items-center gap-2 font-semibold">Албан ёсны сайт <ArrowUpRight size={17}/></span></div></a>
      </div>
      <p className="mt-8 text-sm text-slate-500">Тайлбар: Энд байгаа утас, и-мэйл нь МУИС-ийн төвийн элсэлтийн албаны мэдээлэл. Энэхүү хуудас нь оюутны бие даалтын веб юм.</p>
      <Link href="/news" className="mt-6 inline-block font-semibold text-[#154E85]">Сургуулийн мэдээ мэдээлэл үзэх →</Link>
    </section>
  </main>;
}