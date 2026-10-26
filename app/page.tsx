import { connection } from "next/server";

import { Suspense } from "react";
import Link from "next/link";
import {
  GraduationCap,
  FlaskConical,
  Users,
  Newspaper,
  ArrowRight,
  BookOpen,
  Building2,
  CalendarDays,
  Clock3,
} from "lucide-react";

import {
  getStatistics,
  getSeasonInfo,
  getCategories,
  getCategoryNews,
} from "@/lib/api";

// API 1: Сургуулийн тоон мэдээлэл
type Statistics = {
  bagshAjilchid: string;
  oyutan: string;
  hutulbur: string;
  tenhim: string;
};

// API 3: Хичээлийн улирлын мэдээлэл
type SeasonInfo = {
  uliral: string;
  dolooHonog: string;
  garig: string;
  tegshSondgoi: string;
};

// API 2: Мэдээний ангилал
type NewsCategory = {
  _id: string;
  name: string;
};

// API 4: Мэдээний мэдээлэл
type NewsItem = {
  _id: string;
  title: string;
  description?: string;
  created_at?: string;
};

// Нүүр хуудасны API мэдээллийг ачаалах
async function HomeContent() {
  await connection();
  let stats: Statistics | null = null;
  let season: SeasonInfo | null = null;
  let news: NewsItem[] = [];

  // API 1, 2, 3
  const [statsResult, seasonResult, categoriesResult] =
    await Promise.allSettled([
      getStatistics(),
      getSeasonInfo(),
      getCategories(),
    ]);

  if (statsResult.status === "fulfilled") {
    stats = statsResult.value as Statistics;
  }

  if (seasonResult.status === "fulfilled") {
    season = seasonResult.value as SeasonInfo;
  }

  // API 2-оос ангилал, API 4-өөс мэдээ авна
  if (categoriesResult.status === "fulfilled") {
    const data = categoriesResult.value as {
      newsCategories?: NewsCategory[];
    };

    const categories = data.newsCategories ?? [];

    if (categories.length > 0) {
      const results = await Promise.allSettled(
        categories.map((category) =>
          getCategoryNews(category._id)
        )
      );

      const allNews: NewsItem[] = [];

      results.forEach((result) => {
        if (result.status === "fulfilled") {
          const response = result.value as {
            news?: NewsItem[];
          };

          allNews.push(...(response.news ?? []));
        }
      });

      // Давхардсан мэдээг арилгах
      const uniqueNews = Array.from(
        new Map(
          allNews.map((item) => [item._id, item])
        ).values()
      );

      // Шинэ 3 мэдээг харуулах
      news = uniqueNews
        .sort((a, b) => {
          const dateA = a.created_at
            ? new Date(a.created_at).getTime()
            : 0;

          const dateB = b.created_at
            ? new Date(b.created_at).getTime()
            : 0;

          return dateB - dateA;
        })
        .slice(0, 3);
    }
  }

  // Нүүр хуудасны өнгөлөг картууд
  const quickLinks = [
    {
      title: "Сургалт",
      description: "Хөтөлбөр болон сургалтын мэдээлэл",
      href: "/academics",
      icon: GraduationCap,
      color: "bg-[#0B4F9C]",
    },
    {
      title: "Судалгаа",
      description: "Судалгаа, төсөл, шинэ санаа",
      href: "/research",
      icon: FlaskConical,
      color: "bg-[#C99727]",
    },
    {
      title: "Оюутны амьдрал",
      description: "Оюутанд хэрэгтэй мэдээ, мэдээлэл",
      href: "/news",
      icon: Users,
      color: "bg-[#137D89]",
    },
    {
      title: "Мэдээний архив",
      description: "Өмнөх он, саруудын мэдээлэл",
      href: "/archive",
      icon: Newspaper,
      color: "bg-[#315C99]",
    },
  ];

  // API 1: Тоон мэдээлэл
  const statistics = [
    {
      label: "Оюутан",
      value: stats?.oyutan ?? "—",
      icon: GraduationCap,
    },
    {
      label: "Багш, ажилчид",
      value: stats?.bagshAjilchid ?? "—",
      icon: Users,
    },
    {
      label: "Сургалтын хөтөлбөр",
      value: stats?.hutulbur ?? "—",
      icon: BookOpen,
    },
    {
      label: "Тэнхим",
      value: stats?.tenhim ?? "—",
      icon: Building2,
    },
  ];

  // API 3: Хичээлийн улирал
  const seasonItems = [
    {
      label: "Хичээлийн улирал",
      value: season?.uliral ?? "—",
    },
    {
      label: "Долоо хоног",
      value: season?.dolooHonog ?? "—",
    },
    {
      label: "Гараг",
      value: season?.garig ?? "—",
    },
    {
      label: "Тэгш / сондгой",
      value: season?.tegshSondgoi ?? "—",
    },
  ];

  return (
    <main className="min-h-screen bg-white">

      {/* Зурагт жишгийн дагуу: кампусын өргөн зураг, шилэн карт, элсэлтийн товч */}
      <section className="relative isolate overflow-hidden bg-[#061b2d] text-white">
        <img src="/school-banner.png" alt="МУИС-ийн Баруун бүсийн сургуулийн барилга" className="absolute inset-0 -z-20 h-full w-full object-cover object-center"/>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#061b2d]/95 via-[#061b2d]/70 to-[#061b2d]/20"/>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-72 bg-gradient-to-t from-[#061b2d] to-transparent"/>
        <div className="mx-auto flex min-h-[560px] max-w-7xl flex-col justify-center px-6 pb-24 pt-20 md:px-8 lg:min-h-[590px]">
          <div className="max-w-2xl">
            <p className="text-xs font-black tracking-[.25em] text-[#f0bd65]">МУИС • БАРУУН БҮСИЙН СУРГУУЛЬ</p>
            <h1 className="mt-6 text-[clamp(2.5rem,4.5vw,4.7rem)] font-extrabold leading-[1.12] tracking-tight">Мэдлэгээр<br/><span className="text-[#f0bd65]">ирээдүйгээ бүтээ.</span></h1>
            <p className="mt-6 max-w-lg text-base leading-8 text-white/85 md:text-lg">Суралцах, хөгжих, судлах боломжийг нэг дороос. Элсэлт, хөтөлбөр болон сургуулийн мэдээлэлтэй танилцаарай.</p>
            <div className="mt-8 flex flex-wrap gap-3"><Link href="/admissions" className="inline-flex items-center gap-2 rounded-xl bg-[#e5b75f] px-7 py-4 text-sm font-black text-[#082b46] shadow-lg shadow-black/20 transition hover:bg-white">ЭЛСЭЛТ <ArrowRight size={17}/></Link><Link href="/academics" className="inline-flex items-center gap-2 rounded-xl border border-white/35 bg-white/10 px-7 py-4 text-sm font-black text-white backdrop-blur-md transition hover:bg-white/20">СУРГАЛТЫН ХӨТӨЛБӨР <ArrowRight size={17}/></Link></div>
          </div>
        </div>
        {/* Жишиг загварын 4 хурдан сонголт — бүгд бодит хуудсууд руу холбоно. */}
        <div className="relative mx-auto -mt-14 max-w-7xl px-5 pb-10 md:px-8"><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{[
          {title:"Бакалавр",subtitle:"Элсэлтийн мэдээлэл",href:"/admissions",icon:GraduationCap},
          {title:"Сургалт",subtitle:"Хөтөлбөр, тэнхимүүд",href:"/academics",icon:BookOpen},
          {title:"Судалгаа",subtitle:"Эрдэм шинжилгээ",href:"/research",icon:FlaskConical},
          {title:"Номын сан",subtitle:"Оюутны үйлчилгээ",href:"/library",icon:Building2},
        ].map(({title,subtitle,href,icon:Icon})=><Link key={href} href={href} className="group flex items-center gap-4 rounded-xl border border-[#b5dce7]/35 bg-[#0a354d]/75 p-5 shadow-xl backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#e5b75f] hover:bg-[#15506a]"><span className="rounded-xl border border-[#e5b75f]/30 bg-[#e5b75f]/10 p-3 text-[#e5b75f]"><Icon size={27}/></span><span className="min-w-0"><strong className="block text-base font-bold">{title}</strong><span className="mt-1 block text-xs text-white/70">{subtitle}</span></span><ArrowRight size={17} className="ml-auto shrink-0 text-[#e5b75f] transition group-hover:translate-x-1"/></Link>)}</div></div>
        <div className="border-t border-white/15 bg-[#061b2d]/85"><div className="mx-auto grid max-w-7xl grid-cols-2 gap-5 px-6 py-6 md:grid-cols-4 md:px-8">{statistics.map(item=>{const Icon=item.icon;return <div key={item.label} className="flex items-center gap-3"><Icon size={24} className="shrink-0 text-[#e5b75f]"/><div><strong className="block text-xl font-black text-white md:text-2xl">{item.value}</strong><span className="text-xs text-white/65">{item.label}</span></div></div>})}</div></div>
      </section>

      {/* Том зурагт үйлчилгээний картууд: үндсэн чиглэлүүд рүү шууд очно */}
      <section className="relative z-10 bg-[#F4F6F8] px-5 py-16 md:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
            <div><p className="text-xs font-extrabold tracking-[0.25em] text-[#B17A26]">ТАНЫ БОЛОМЖ ЭНДЭЭС ЭХЭЛНЭ</p><h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#092B4B] md:text-5xl">Өөрийн замаа сонго.</h2></div>
            <p className="max-w-sm text-base leading-8 text-slate-600">Элсэлт, сургалт, судалгаа, оюутны амьдралын мэдээлэлд хурдан хүрээрэй.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              {title:"Элсэлт",description:"Ирээдүйн оюутнуудад",href:"/admissions",image:"/admis.webp",number:"01"},
              {title:"Сургалт",description:"Хөтөлбөр, суралцах боломж",href:"/academics",image:"/bbsurguuli.webp",number:"02"},
              {title:"Судалгаа",description:"Эрдэм шинжилгээ, шинэ санаа",href:"/research",image:"/research.webp",number:"03"},
              {title:"Оюутны амьдрал",description:"Номын сан, сургуулийн орчин",href:"/library",image:"/library.webp",number:"04"},
            ].map((item)=>(
              <Link key={item.href} href={item.href} className="group relative flex min-h-[330px] flex-col justify-between overflow-hidden rounded-2xl bg-[#0C3454] p-7 text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
                <img src={item.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071E35] via-[#071E35]/45 to-[#071E35]/10" />
                <div className="relative flex items-start justify-between"><span className="text-sm font-bold tracking-widest text-white/80">{item.number} / 04</span><span className="rounded-full border border-white/40 bg-white/10 p-3 backdrop-blur-sm transition group-hover:bg-[#F3B64D] group-hover:text-[#092745]"><ArrowRight size={20}/></span></div>
                <div className="relative"><h3 className="text-2xl font-bold tracking-tight">{item.title}</h3><p className="mt-3 text-sm leading-6 text-white/80">{item.description}</p><div className="mt-6 h-1 w-12 rounded-full bg-[#F3B64D] transition-all group-hover:w-full"/></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Онцлох мэдээ: бодит API мэдээг илүү цэгцтэй картуудаар үзүүлнэ. */}
      <section className="bg-white px-5 py-16 md:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs font-extrabold tracking-[.24em] text-[#B17A26]">МЭДЭЭ • ҮЙЛ ЯВДАЛ</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#092B4B] md:text-4xl">Онцлох мэдээ</h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600">Сургуулийн шинэ мэдээ, үйл ажиллагааны мэдээллийг нэг дороос.</p>
            </div>
            <Link href="/news" className="inline-flex items-center gap-3 rounded-full border border-[#0B3456]/20 px-6 py-3 text-sm font-bold text-[#0B3456] transition hover:border-[#0B3456] hover:bg-[#F1F5F9]">Бүх мэдээг үзэх <ArrowRight size={18}/></Link>
          </div>
          {news.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-3">
              {news.map((item, index) => (
                <Link key={item._id} href={`/news/${item._id}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#D2A153]/50 hover:shadow-xl">
                  {/* Мэдээнд зураг байхгүй бол өөр мэдээний зургийг буруу харуулахгүй. */}
                  <div className="relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-[#0B3456] to-[#195D86]">
                    <div className="absolute -right-8 -top-10 h-40 w-40 rounded-full border border-white/15" />
                    <div className="absolute -bottom-16 -left-12 h-48 w-48 rounded-full border border-white/10" />
                    <Newspaper size={46} strokeWidth={1.3} className="relative text-white/80" />
                    <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-[11px] font-bold tracking-wider text-white backdrop-blur-sm">МЭДЭЭ {String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="flex items-center gap-2 text-xs font-semibold text-[#9A7137]"><CalendarDays size={15}/>{item.created_at ? new Date(item.created_at).toLocaleDateString("mn-MN") : "Сургуулийн мэдээ"}</p>
                    <h3 className="mt-4 line-clamp-3 text-xl font-extrabold leading-8 text-[#0B3456] transition group-hover:text-[#B17A26]">{item.title}</h3>
                    {item.description && <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600">{item.description.replace(/<[^>]*>/g, "")}</p>}
                    <span className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-bold text-[#0B3456]">Дэлгэрэнгүй <ArrowRight size={16} className="transition-transform group-hover:translate-x-1"/></span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-[#F6F8FA] px-8 py-14 text-center">
              <Newspaper size={42} className="mx-auto text-[#0B3456]"/>
              <p className="mt-4 text-slate-600">Мэдээний мэдээлэл одоогоор ачаалагдсангүй.</p>
              <Link href="/news" className="mt-5 inline-flex items-center gap-2 font-bold text-[#0B3456]">Мэдээний хуудас <ArrowRight size={16}/></Link>
            </div>
          )}
        </div>
      </section>

      {/* Бодит сургуулийн зургууд: эхний зургийг онцолж, дараагийн хоёрыг хажууд нь байрлуулна. */}
      <section className="bg-[#F3F6F8] px-5 py-16 md:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
            <div><p className="text-xs font-extrabold tracking-[.24em] text-[#B17A26]">МАНАЙ ОРЧИН</p><h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#092B4B] md:text-4xl">Сургуулийн амьдрал</h2><p className="mt-4 text-sm leading-7 text-slate-600">Сургуулийн орчин, хамт олны бодит гэрэл зургууд.</p></div>
            <Link href="/about" className="inline-flex items-center gap-2 text-sm font-bold text-[#0B3456] hover:text-[#B17A26]">Сургуулийн тухай <ArrowRight size={17}/></Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 md:grid-rows-2">
            {[
              {src:"/grad-scaled-e1705378650270-1024x682.webp",label:"Төгсөлтийн мөчүүд"},
              {src:"/alsiin.webp",label:"Сургуулийн орчин"},
              {src:"/news_2026_10_19_173350.webp",label:"Сургуулийн хамт олон"},
            ].map((photo,index)=>(
              <figure key={photo.src} className={`group relative min-h-[240px] overflow-hidden rounded-2xl bg-[#0B3456] shadow-sm ${index===0?"md:row-span-2 md:min-h-[500px]":"md:min-h-[240px]"}`}>
                <img src={photo.src} alt={photo.label} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"/>
                <div className="absolute inset-0 bg-gradient-to-t from-[#071E35]/85 via-transparent to-transparent"/>
                <figcaption className="absolute bottom-0 left-0 right-0 p-6 text-xl font-extrabold text-white md:p-8">{photo.label}<span className="mt-3 block h-1 w-12 rounded-full bg-[#F4B84E]"/></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================
          5. ТООН ҮЗҮҮЛЭЛТ — API 1
      ==================================== */}
      <section
        id="statistics"
        className="bg-[#F7F8F8] px-5 py-16 md:px-8"
      >
        <div className="mx-auto max-w-7xl">

          <div className="mb-9 text-center">
            <p className="text-sm font-bold text-[#C58B14]">
              МАНАЙ СУРГУУЛЬ
            </p>

            <h2 className="mt-2 text-3xl font-extrabold text-[#07347C]">
              Тоон үзүүлэлт
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {statistics.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="border border-slate-200 bg-white p-7 text-center"
                >
                  <Icon
                    size={35}
                    className="mx-auto text-[#087BFA]"
                  />

                  <p className="mt-4 text-3xl font-extrabold text-[#07347C] md:text-4xl">
                    {item.value}
                  </p>

                  <p className="mt-3 text-sm font-medium text-slate-500">
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>

          {!stats && (
            <p className="mt-5 text-center text-red-600">
              Тоон мэдээлэл авахад алдаа гарлаа.
            </p>
          )}
        </div>
      </section>

      {/* ====================================
          6. ХИЧЭЭЛИЙН УЛИРАЛ — API 3
      ==================================== */}
      <section className="bg-gradient-to-r from-[#071B38] to-[#07347C] px-5 py-16 text-white md:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="mb-9 text-center">
            <div className="mb-3 flex items-center justify-center gap-2 text-[#FFBE2E]">
              <Clock3 size={20} />
              <span className="text-sm font-bold">
                ХИЧЭЭЛИЙН МЭДЭЭЛЭЛ
              </span>
            </div>

            <h2 className="text-3xl font-extrabold">
              Хичээлийн улирал
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {seasonItems.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/20 bg-white/10 p-6 text-center"
              >
                <p className="text-xl font-extrabold text-[#FFBE2E] md:text-2xl">
                  {item.value}
                </p>

                <p className="mt-3 text-sm text-blue-100">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          {!season && (
            <p className="mt-5 text-center text-red-200">
              Хичээлийн улирлын мэдээлэл
              авахад алдаа гарлаа.
            </p>
          )}
        </div>
      </section>

      {/* Оюутны булан: нэмэлт API шаардахгүй, одоо байгаа хуудсууд руу холбоно. */}
      <section className="bg-white px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="text-sm font-bold tracking-widest text-[#C58B14]">ОЮУТАНД ЗОРИУЛАВ</p>
            <h2 className="mt-2 text-3xl font-extrabold text-[#07347C]">Оюутны булан</h2>
            <p className="mt-3 text-slate-600">Хэрэгтэй мэдээлэл, үйлчилгээний холбоосууд.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { title: "Сургалтын мэдээлэл", description: "Хөтөлбөр болон сургалтын үйл ажиллагаа", href: "/academics", icon: GraduationCap },
              { title: "Номын сан", description: "Номын сан, цахим эх сурвалжийн мэдээлэл", href: "/library", icon: BookOpen },
              { title: "Мэдээний архив", description: "Өмнөх он, саруудын мэдээ мэдээлэл", href: "/archive", icon: Newspaper },
            ].map(({ title, description, href, icon: Icon }) => (
              <Link key={href} href={href} className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-[#F8FAFD] p-6 transition hover:border-blue-300 hover:bg-blue-50">
                <span className="rounded-xl bg-[#07347C] p-3 text-white"><Icon size={24} /></span>
                <span className="flex-1"><strong className="block text-lg text-[#07347C]">{title}</strong><span className="mt-2 block text-sm leading-6 text-slate-600">{description}</span><span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-700">Үзэх <ArrowRight size={16}/></span></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================
          7. ДООД МЭДЭЭЛЛИЙН ХЭСЭГ
      ==================================== */}
      <section className="bg-white px-5 py-16 md:px-8">
        <div className="mx-auto max-w-4xl text-center">

          <p className="text-sm font-bold tracking-widest text-[#D59B16]">
            МЭДЛЭГ • ХӨГЖИЛ • ИРЭЭДҮЙ
          </p>

          <h2 className="mt-4 text-3xl font-extrabold text-[#07347C] md:text-4xl">
            Мэдлэгээр ирээдүйгээ бүтээе
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-600">
            Сургуулийн сургалт, үйл ажиллагаа,
            шинэ мэдээ болон оюутанд хэрэгтэй
            мэдээлэлтэй танилцаарай.
          </p>

          <Link
            href="/news"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#FFBE2E] px-8 py-4 font-bold text-[#07347C] transition hover:bg-[#FFD25C]"
          >
            Мэдээ мэдээлэл үзэх
            <ArrowRight size={19} />
          </Link>
        </div>
      </section>

    </main>
  );
}

// API ачаалж байх үеийн дэлгэц
function LoadingHome() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#07347C] px-6">
      <div className="text-center">
        <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-[#FFBE2E]" />

        <p className="font-medium text-white">
          Сургуулийн мэдээлэл ачаалж байна...
        </p>
      </div>
    </main>
  );
}

// Next.js 16: API хүсэлтүүдийг Suspense дотор ачаална
export default function Home() {
  return (
    <Suspense fallback={<LoadingHome />}>
      <HomeContent />
    </Suspense>
  );
}
