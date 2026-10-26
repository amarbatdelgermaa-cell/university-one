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

      {/* Олон улсын их сургуулийн хэв маяг: зураг ба гарчиг тусдаа */}
      <section className="bg-[#F8F7F4]">
        <div className="relative h-[280px] overflow-hidden bg-[#DFE7EB] sm:h-[430px] lg:h-[590px]">
          <div className="absolute inset-0 bg-[url('/school-banner.png')] bg-cover bg-center" role="img" aria-label="МУИС-ийн Баруун бүсийн сургуулийн барилга" />
          <div className="absolute bottom-0 left-0 bg-[#0D3154]/90 px-5 py-3 text-[11px] font-semibold tracking-widest text-white sm:left-8 sm:px-7">МУИС • БАРУУН БҮСИЙН СУРГУУЛЬ</div>
        </div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 md:px-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-16 lg:py-20">
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[#A67B3E]">МЭДЛЭГ • СУДАЛГАА • ИРЭЭДҮЙ</p>
            <h1 className="max-w-3xl text-[clamp(2.5rem,5.2vw,5rem)] font-semibold leading-[1.12] tracking-tight text-[#102F4F]">Боломжоо нээ.<br/><span className="font-normal text-[#53718D]">Ирээдүйгээ бүтээ.</span></h1>
          </div>
          <div className="lg:pb-2">
            <p className="max-w-md text-base leading-8 text-slate-600">МУИС-ийн Баруун бүсийн сургуулийн сургалт, судалгаа, оюутны амьдрал болон шинэ мэдээтэй нэг дор танилцаарай.</p>
            <div className="mt-7 flex flex-wrap items-center gap-5">
              <Link href="/admissions" className="inline-flex items-center gap-2 rounded-md bg-[#103B69] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#175284]">Элсэлтийн мэдээлэл <ArrowRight size={17}/></Link>
              <Link href="/about" className="inline-flex items-center gap-2 border-b border-[#A67B3E] pb-1 text-sm font-semibold text-[#103B69]">Сургуулийн тухай <ArrowRight size={16}/></Link>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================
          3. ДӨРВӨН ӨНГӨЛӨГ КАРТ
      ==================================== */}
      <section className="relative z-20 mx-auto max-w-7xl px-5 py-16 md:px-8 lg:py-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {quickLinks.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                className="group flex min-h-[172px] gap-4 border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#CDA45D] hover:shadow-lg"
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-white ${item.color}`}
                >
                  <Icon size={30} />
                </div>

                <div className="flex min-w-0 flex-1 flex-col">
                  <h2 className="text-lg font-bold text-[#103B69]">
                    {item.title}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {item.description}
                  </p>

                  <ArrowRight
                    size={21}
                    className="mt-auto self-end text-[#B18446] transition group-hover:translate-x-1"
                  />
                </div>
              </Link>
            );
          })}

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
              { src: "/admis.webp", label: "Элсэлттэй холбоотой зураг" }
            ].map((photo) => (
              <figure key={photo.src} className="overflow-hidden bg-white">
                <img src={photo.src} alt={photo.label} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                <figcaption className="px-4 py-4 text-sm font-semibold text-[#103B69]">{photo.label}</figcaption>
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
