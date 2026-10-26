import Link from "next/link";
import { ArrowRight, BookOpen, Building2, GraduationCap, Info } from "lucide-react";

export const metadata = {
  title: "Тэнхимүүд | МУИС-ийн Баруун бүсийн сургууль",
};

// Эх сурвалж: МУИС-ийн Ховд дахь салбар сургуулийн бүтцийн схем.
// Бүтэц шинэчлэгдсэн байж болох тул одоогийн тоо гэж баталж бичээгүй.
const departments = [
  {
    name: "Математик, компьютерийн ухааны тэнхим",
    image: "/dep_5f8428aa3209d31ae019929a.webp",
    short: "Математик, программчлал, компьютерийн шинжлэх ухааны чиглэл",
    subjects: ["Математик", "Компьютерийн ухаан", "Программчлал"],
    detail: "Математик болон компьютерийн ухааны суурь мэдлэг, тооцоолол, алгоритм, мэдээллийн технологитой холбоотой сургалт, судалгааны чиглэлийг хамарна.",
  },
  {
    name: "Газар зүй, физик, инженерчлэлийн тэнхим",
    image: "/departments/physics.svg",
    short: "Байгалийн шинжлэх ухаан, инженерийн чиглэл",
    subjects: ["Газар зүй", "Физик", "Инженерчлэл"],
    detail: "Байгалийн үзэгдэл, орон зайн судалгаа, физикийн суурь ойлголт болон инженерийн чиглэлийн мэдлэгийг хамарна.",
  },
  {
    name: "Хими, биологийн тэнхим",
    image: "/departments/chemistry.svg",
    short: "Хими, амьд байгаль, лабораторийн судалгааны чиглэл",
    subjects: ["Хими", "Биологи", "Байгалийн шинжлэх ухаан"],
    detail: "Бодисын бүтэц, хувирал, амьд организм, байгаль орчны шинжлэх ухааны суурь ойлголт, судалгааны чиглэлийг хамарна.",
  },
  {
    name: "Гадаад хэлний тэнхим",
    image: "/departments/languages.svg",
    short: "Гадаад хэл, хэл шинжлэл, хэлний сургалтын чиглэл",
    subjects: ["Гадаад хэл", "Хэл шинжлэл", "Хэлний боловсрол"],
    detail: "Гадаад хэлний мэдлэг, харилцааны чадвар, хэл шинжлэл болон хэлний сургалттай холбоотой чиглэлүүдийг хамарна.",
  },
  {
    name: "Боловсрол судлалын тэнхим",
    image: "/departments/education.svg",
    short: "Багш боловсрол, сурган хүмүүжүүлэх ухааны чиглэл",
    subjects: ["Боловсрол судлал", "Сурган хүмүүжүүлэх ухаан", "Багшийн хөгжил"],
    detail: "Боловсролын онол, арга зүй, багшлах үйл ажиллагаа болон суралцахуйн судалгаатай холбоотой чиглэлүүдийг хамарна.",
  },
  {
    name: "Нийгэм, хүмүүнлэгийн ухааны тэнхим",
    image: "/departments/humanities.svg",
    short: "Нийгэм, түүх, соёл, хүмүүнлэгийн шинжлэх ухаан",
    subjects: ["Нийгмийн ухаан", "Түүх, соёл", "Хүмүүнлэгийн ухаан"],
    detail: "Нийгмийн харилцаа, түүх, соёл, хүмүүнлэгийн чиглэлийн мэдлэг, судалгааг хамарна.",
  },
  {
    name: "Бизнес, эрх зүйн тэнхим",
    image: "/departments/business.svg",
    short: "Бизнес, эдийн засаг, эрх зүйн чиглэл",
    subjects: ["Бизнес", "Эдийн засаг", "Эрх зүй"],
    detail: "Бизнесийн үйл ажиллагаа, эдийн засаг, санхүү болон эрх зүйн үндсэн чиглэлүүдтэй холбоотой сургалт, судалгааг хамарна.",
  },
];

export default function SchoolsPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFD]">
      {/* Тэнхимүүдийн хуудасны гарчиг */}
      <section className="bg-[#103B69] px-5 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold tracking-[0.18em] text-[#E9BE68]">СУРГУУЛИЙН БҮТЭЦ</p>
          <h1 className="mt-3 text-4xl font-bold">Тэнхимүүд</h1>
          <p className="mt-4 max-w-2xl leading-7 text-blue-100">
            МУИС-ийн Ховд дахь салбар сургуулийн бүтцийн баримтад дурдсан тэнхимүүдийн танилцуулга.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="mb-9 grid gap-5 sm:grid-cols-2">
          <div className="rounded-xl border border-blue-100 bg-white p-7">
            <Building2 className="text-[#154E85]" size={30}/>
            <p className="mt-4 text-4xl font-bold text-[#123C69]">{departments.length}</p>
            <p className="mt-2 font-semibold text-slate-700">Бүтцийн баримтад нэрлэгдсэн тэнхим</p>
          </div>
          <div className="rounded-xl border border-blue-100 bg-white p-7">
            <BookOpen className="text-[#154E85]" size={30}/>
            <p className="mt-4 text-2xl font-bold text-[#123C69]">Сургалт ба судалгаа</p>
            <p className="mt-2 text-slate-600">Байгалийн ухаан, боловсрол, хүмүүнлэг, бизнес, технологийн чиглэлүүд</p>
          </div>
        </div>

        <div className="mb-7">
          <p className="text-xs font-bold tracking-widest text-[#B07B20]">ТЭНХИМҮҮДИЙН ЖАГСААЛТ</p>
          <h2 className="mt-2 text-2xl font-bold text-[#123C69]">Тэнхим тус бүрийн мэдээлэл</h2>
          <p className="mt-3 text-slate-600">“Дэлгэрэнгүй үзэх” дээр дарж тухайн тэнхимийн чиглэлтэй танилцаарай.</p>
        </div>

        <div className="grid items-start gap-5 md:grid-cols-2">
          {departments.map((item, index) => (
            <details key={item.name} className="group rounded-xl border border-slate-200 bg-white p-6 transition hover:border-blue-300 open:border-[#154E85] open:shadow-md">
              <summary className="cursor-pointer list-none">
                {/* Тэнхим тус бүрийн зураг */}
                <img src={item.image} alt={index === 0 ? "Математик, мэдээлэл зүйн тэнхимийн хамт олны зураг" : `${item.name} чиглэлийн дүрслэл`} className="mb-5 aspect-[16/9] w-full rounded-lg object-cover" loading="lazy" />
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#EAF1F8] font-bold text-[#154E85]">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-bold leading-7 text-[#123C69]">{item.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.short}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#154E85]">
                      Дэлгэрэнгүй үзэх <ArrowRight size={16} className="transition group-open:rotate-90"/>
                    </span>
                  </div>
                </div>
              </summary>
              <div className="mt-5 border-t border-slate-100 pt-5">
                <p className="text-sm leading-7 text-slate-700">{item.detail}</p>
                <p className="mt-5 text-sm font-bold text-[#123C69]">Хамрах чиглэлүүд</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.subjects.map(subject => <span key={subject} className="rounded-full bg-[#EAF1F8] px-3 py-1.5 text-xs font-medium text-[#123C69]">{subject}</span>)}
                </div>
                <p className="mt-4 text-xs leading-5 text-slate-500">Эдгээр нь ерөнхий судлах чиглэлүүд; албан ёсоор баталсан хөтөлбөрийн бүрэн жагсаалт биш.</p>
              </div>
            </details>
          ))}
        </div>

        {/* Тэнхимийн бодит гэрэл зургуудыг нэртэй нь баталгаагүй тул тусдаа харуулна. */}
        <section className="mt-14">
          <p className="text-xs font-bold tracking-widest text-[#B07B20]">БОДИТ ГЭРЭЛ ЗУРГУУД</p>
          <h2 className="mt-2 text-2xl font-bold text-[#123C69]">Тэнхим, багш хамт олны зургийн сан</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">Албан ёсны сургуулийн сайтаас хадгалсан гэрэл зургууд. Зургийн нэрээс нь бусад тэнхимийг яг таг тогтоох боломжгүй тул буруу нэр холбож бичээгүй.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "dep_5f8428aa3209d31ae019929a.webp",
              "dep_5f8428aa3209d31ae019929b.webp",
              "dep_5f9a848b65b071188cb1a008.webp",
              "dep_5f9a848b65b071188cb1a009.webp",
              "dep_5f8428aa3209d31ae019929e.webp",
            ].map((src,index) => (
              <figure key={src} className="overflow-hidden bg-white border border-slate-200">
                <img src={`/${src}`} alt={`Сургуулийн тэнхимийн зургийн сан, зураг ${index + 1}`} className="aspect-[16/10] w-full object-cover" loading="lazy" />
              </figure>
            ))}
          </div>
        </section>
        <div className="mt-10 rounded-xl border border-amber-200 bg-[#FFFCF5] p-6">
          <div className="flex items-start gap-3">
            <Info className="mt-1 shrink-0 text-[#A9761D]" size={21}/>
            <div>
              <h2 className="font-bold text-[#123C69]">Мэдээллийн эх сурвалж</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Тэнхимүүдийн нэрийг МУИС-ийн Ховд дахь салбар сургуулийн бүтцийн баримтаас авсан.
                Бүтэц өөрчлөгдсөн байж болох тул одоогийн албан ёсны тоо, багш нарын нэр,
                хөтөлбөрийн жагсаалтыг сургуулиас нягтлах шаардлагатай.
              </p>
              <a href="http://khovd.num.edu.mn:5000/" target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-semibold text-blue-800 underline">Сургуулийн албан ёсны сайт</a>
            </div>
          </div>
        </div>

        <Link href="/academics" className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#123C69] px-6 py-3 font-semibold text-white">
          <GraduationCap size={19}/> Сургалтын мэдээлэл <ArrowRight size={17}/>
        </Link>
      </section>
    </main>
  );
}
