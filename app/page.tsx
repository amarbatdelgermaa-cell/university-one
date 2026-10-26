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

      {/* Шинэ нүүр: зураг дээр гарчиг байрлуулсан, өндөр нягтралтай hero */}
      <section className="relative isolate min-h-[680px] overflow-hidden bg-[#071E35] text-white lg:min-h-[760px]">
        <div className="absolute inset-0 bg-[url('/school-banner.png')] bg-cover bg-center" role="img" aria-label="МУИС-ийн Баруун бүсийн сургуулийн барилга" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071E35]/95 via-[#071E35]/75 to-[#071E35]/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071E35]/85 via-transparent to-transparent" />
        <div className="relative mx-auto flex min-h-[680px] max-w-7xl flex-col justify-center px-6 pb-36 pt-24 md:px-10 lg:min-h-[760px]">
          <div className="mb-8 inline-flex w-fit items-center gap-3 rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-xs font-bold tracking-[0.18em] backdrop-blur-md"><span className="h-2 w-2 rounded-full bg-[#F3B64D]" /> МУИС • БАРУУН БҮСИЙН СУРГУУЛЬ</div>
          <h1 className="max-w-4xl text-[clamp(3.5rem,7.5vw,7.5rem)] font-black leading-[1.02] tracking-tight">Мэдлэгээс<br/><span className="text-[#F3B64D]">ирээдүй рүү.</span></h1>
          <p className="mt-8 max-w-xl border-l-4 border-[#F3B64D] pl-6 text-base leading-8 text-white/85 md:text-lg">Суралцах, хөгжих, судлах боломжийг нэг дороос. МУИС-ийн Баруун бүсийн сургуулийн ертөнцтэй танилцаарай.</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/admissions" className="inline-flex items-center gap-3 rounded-full bg-[#F3B64D] px-8 py-4 text-sm font-extrabold text-[#092745] transition hover:bg-white">Элсэлттэй танилцах <ArrowRight size={18}/></Link>
            <Link href="/about" className="inline-flex items-center gap-3 rounded-full border border-white/40 bg-white/10 px-8 py-4 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20">Сургуулийн тухай <ArrowRight size={18}/></Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-0 right-0 mx-auto flex max-w-7xl items-center justify-between px-6 text-xs font-bold tracking-[0.2em] text-white/70 md:px-10"><span>ХОВД • МОНГОЛ УЛС</span><span>СУРГАЛТ · СУДАЛГАА · ХӨГЖИЛ</span></div>
      </section>

      {/* Том зурагт үйлчилгээний картууд: үндсэн чиглэлүүд рүү шууд очно */}
      <section className="relative z-10 bg-[#F4F6F8] px-5 py-20 md:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
            <div><p className="text-xs font-extrabold tracking-[0.25em] text-[#B17A26]">ТАНЫ БОЛОМЖ ЭНДЭЭС ЭХЭЛНЭ</p><h2 className="mt-4 text-4xl font-black tracking-tight text-[#092B4B] md:text-6xl">Өөрийн замаа сонго.</h2></div>
            <p className="max-w-sm text-base leading-8 text-slate-600">Элсэлт, сургалт, судалгаа, оюутны амьдралын мэдээлэлд хурдан хүрээрэй.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              {title:"Элсэлт",description:"Ирээдүйн оюутнуудад",href:"/admissions",image:"/admis.webp",number:"01"},
              {title:"Сургалт",description:"Хөтөлбөр, суралцах боломж",href:"/academics",image:"/bbsurguuli.webp",number:"02"},
              {title:"Судалгаа",description:"Эрдэм шинжилгээ, шинэ санаа",href:"/research",image:"/research.webp",number:"03"},
              {title:"Оюутны амьдрал",description:"Номын сан, сургуулийн орчин",href:"/library",image:"/library.webp",number:"04"},
            ].map((item)=>(
              <Link key={item.href} href={item.href} className="group relative flex min-h-[390px] flex-col justify-between overflow-hidden rounded-2xl bg-[#0C3454] p-7 text-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <img src={item.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071E35] via-[#071E35]/45 to-[#071E35]/10" />
                <div className="relative flex items-start justify-between"><span className="text-sm font-bold tracking-widest text-white/80">{item.number} / 04</span><span className="rounded-full border border-white/40 bg-white/10 p-3 backdrop-blur-sm transition group-hover:bg-[#F3B64D] group-hover:text-[#092745]"><ArrowRight size={20}/></span></div>
                <div className="relative"><h3 className="text-3xl font-black tracking-tight">{item.title}</h3><p className="mt-3 text-sm leading-6 text-white/80">{item.description}</p><div className="mt-6 h-1 w-12 rounded-full bg-[#F3B64D] transition-all group-hover:w-full"/></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================
          4. ОНЦЛОХ МЭДЭЭ — API 2, API 4
      ==================================== */}
      <section className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">

          <div>
            <p className="text-sm font-bold text-[#D59B16]">
              СУРГУУЛИЙН МЭДЭЭ
            </p>

            <h2 className="mt-2 text-3xl font-extrabold text-[#07347C]">
              Онцлох мэдээ
            </h2>
          </div>

          <Link
            href="/news"
            className="inline-flex items-center gap-2 font-bold text-[#07347C] hover:text-[#087BFA]"
          >
            Бүх мэдээ
            <ArrowRight size={18} />
          </Link>
        </div>

        {news.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-3">
            {news.map((item) => (
              <Link
                key={item._id}
                href={`/news/${item._id}`}
                className="group overflow-hidden border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Мэдээнд зураг холбоогүй үед өөр нийтлэлийн зургийг буруу оноохгүй. */}
                <div className="flex h-40 items-center justify-center bg-[#123D63]">
                  <Newspaper size={54} className="text-white/80" />
                </div>

                <div className="p-6">
                  <div className="mb-3 flex items-center gap-2 text-xs text-slate-500">
                    <CalendarDays size={15} />

                    {item.created_at
                      ? new Date(
                          item.created_at
                        ).toLocaleDateString("mn-MN")
                      : "Сургуулийн мэдээ"}
                  </div>

                  <h3 className="line-clamp-3 text-lg font-bold leading-7 text-[#07347C] group-hover:text-[#087BFA]">
                    {item.title}
                  </h3>

                  {item.description && (
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
                      {item.description.replace(
                        /<[^>]*>/g,
                        ""
                      )}
                    </p>
                  )}

                  <div className="mt-5 flex items-center gap-2 text-sm font-bold text-[#087BFA]">
                    Дэлгэрэнгүй унших
                    <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-blue-100 bg-white p-10 text-center">
            <Newspaper
              size={42}
              className="mx-auto text-[#087BFA]"
            />

            <p className="mt-4 text-slate-600">
              Мэдээний мэдээлэл одоогоор
              ачаалагдсангүй.
            </p>

            <Link
              href="/news"
              className="mt-4 inline-block font-bold text-[#087BFA]"
            >
              Мэдээний хуудас руу очих →
            </Link>
          </div>
        )}
      </section>

      {/* public/ хавтсанд оруулсан бодит зурагт сан. Зургийг худал мэдээтэй холбохгүй. */}
      <section className="bg-[#F6F8FA] px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold tracking-[0.2em] text-[#A67B3E]">МАНАЙ ОРЧИН</p>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
            <div>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#103B69] md:text-4xl">Сургуулийн амьдрал зургаар</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">Сургуулийн сайтаас хадгалсан бодит гэрэл зургуудын цуглуулга.</p>
            </div>
            <Link href="/news" className="inline-flex items-center gap-2 border-b border-[#B18446] pb-1 text-sm font-bold text-[#103B69]">Мэдээ мэдээлэл <ArrowRight size={16}/></Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { src: "/grad-scaled-e1705378650270-1024x682.webp", label: "Төгсөлтийн зураг" },
              { src: "/alsiin.webp", label: "Сургуулийн зургийн сан" },
              { src: "/news_2026_10_19_173350.webp", label: "Сургуулийн хамт олон" }
            ].map((photo) => (
              <figure key={photo.src} className="overflow-hidden bg-white">
                <img src={photo.src} alt={photo.label} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                <figcaption className="px-4 py-4 text-sm font-semibold text-[#103B69]">{photo.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Мандах зэрэг их сургуулиудын ашиглахад хялбар үйлчилгээний хэсгээс санаа авав. */}
      <section className="bg-white px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-xs font-bold tracking-[.2em] text-[#B18446]">ХУРДАН ХОЛБООС</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#103553] md:text-4xl">Танд хэрэгтэй мэдээлэл</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">Элсэгч, оюутан, багш, судлаачдад зориулсан мэдээллийг нэг дороос.</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {title:"Элсэгчдэд",text:"Элсэлтийн заавар, бүртгэл",href:"/admissions",image:"/admis.webp"},
              {title:"Оюутнуудад",text:"Номын сан, суралцах орчин",href:"/library",image:"/library.webp"},
              {title:"Судлаачдад",text:"Эрдэм шинжилгээ, судалгаа",href:"/research",image:"/research.webp"},
              {title:"Тэнхимүүд",text:"Сургуулийн бүтэц, чиглэлүүд",href:"/schools",image:"/dep_5f8428aa3209d31ae019929a.webp"},
            ].map(item=>(
              <Link key={item.href} href={item.href} className="group overflow-hidden border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg">
                <div className="flex h-36 items-center justify-center overflow-hidden bg-[#E9F0F5] p-3">
                  <img src={item.image} alt="" loading="lazy" className="h-full w-full object-contain transition duration-300 group-hover:scale-105"/>
                </div>
                <div className="p-6"><h3 className="text-lg font-bold text-[#103553]">{item.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#103553]">Мэдээлэл үзэх <ArrowRight size={16}/></span></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================
          5. ТООН ҮЗҮҮЛЭЛТ — API 1
      ==================================== */}
      <section
        id="statistics"
        className="bg-[#F7F8F8] px-5 py-20 md:px-8"
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
