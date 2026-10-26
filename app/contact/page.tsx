import { ExternalLink, Globe, Mail } from "lucide-react";
export const metadata = { title: "Холбоо барих | МУИС-ийн Баруун бүсийн сургууль" };
export default function ContactPage() {
  return <main className="min-h-screen bg-slate-50">
    <section className="bg-[#07347C] px-5 py-14 text-white"><div className="mx-auto max-w-6xl"><p className="font-bold text-[#F7BC32]">ХОЛБОО БАРИХ</p><h1 className="mt-3 text-4xl font-bold">Холбоо барих</h1><p className="mt-4 text-blue-100">Сургуулийн албан ёсны холбоо барих мэдээллийг ашиглаарай.</p></div></section>
    <section className="mx-auto max-w-6xl px-5 py-12"><div className="max-w-2xl rounded-2xl border bg-white p-8 shadow-sm">
      <Globe size={34} className="text-blue-800"/><h2 className="mt-4 text-xl font-bold text-[#07347C]">Албан ёсны цахим хуудас</h2>
      <a className="mt-3 inline-flex items-center gap-2 break-all font-semibold text-blue-700 underline" href="http://khovd.num.edu.mn:5000/" target="_blank" rel="noopener noreferrer">khovd.num.edu.mn:5000 <ExternalLink size={18}/></a>
      <div className="mt-8 flex items-start gap-3 border-t pt-6"><Mail className="shrink-0 text-blue-800"/><p className="text-slate-600">Утас, и-мэйл болон хаягийн баталгаажсан мэдээллийг сургуулийн эх сурвалжаас нэмж оруулна.</p></div>
      <p className="mt-6 text-xs text-slate-500">Энэ бол оюутны бие даалтын веб загвар; албан ёсны сайт биш.</p>
    </div></section>
  </main>;
}