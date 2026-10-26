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
      color: "bg-[#087BFA]",
    },
    {
      title: "Судалгаа",
      description: "Судалгаа, төсөл, шинэ санаа",
      href: "/research",
      icon: FlaskConical,
      color: "bg-[#FFBB24]",
    },
    {
      title: "Оюутны амьдрал",
      description: "Оюутанд хэрэгтэй мэдээ, мэдээлэл",
      href: "/news",
      icon: Users,
      color: "bg-[#00A5A5]",
    },
    {
      title: "Мэдээний архив",
      description: "Өмнөх он, саруудын мэдээлэл",
      href: "/archive",
      icon: Newspaper,
      color: "bg-[#FF841F]",
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
    <main className="min-h-screen bg-[#F4F8FF]">

      {/* ====================================
          1. ЦЭНХЭР ТАНИЛЦУУЛГА
      ==================================== */}
      <section className="relative z-10 overflow-hidden bg-[#073C86] text-white">

        {/* Арын дугуй чимэглэл */}
        <div className="pointer-events-none absolute -right-28 -top-24 h-80 w-80 rounded-full border border-[#F7BC32]/20" />
        <div className="pointer-events-none absolute -right-16 -top-10 h-64 w-64 rounded-full border border-[#F7BC32]/20" />

        <div className="relative mx-auto max-w-7xl px-5 pb-7 pt-8 md:px-8 md:pb-8 md:pt-10">

          <div className="mb-4 inline-flex items-center rounded-full border border-[#F7BC32]/70 px-5 py-2 text-xs font-bold tracking-[0.16em] text-[#F7BC32]">
            МЭДЛЭГ • ХӨГЖИЛ • ИРЭЭДҮЙ
          </div>

          <h1 className="max-w-5xl text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
            Баруун бүсийн{" "}
            <span className="text-[#FFBE2E]">
              их сургууль
            </span>
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-blue-100 md:text-base">
            Сургуулийн мэдээ, сургалт, үйл ажиллагаа
            болон хичээлийн улирлын мэдээллийг
            нэг дороос аваарай.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-full bg-[#FFBE2E] px-6 py-3 text-sm font-bold text-[#082C66] transition hover:bg-[#FFD25C]"
            >
              Дэлгэрэнгүй
              <ArrowRight size={17} />
            </Link>

            <Link
              href="/news"
              className="inline-flex items-center gap-2 rounded-full border border-[#F7BC32] px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Мэдээ үзэх
              <ArrowRight size={17} />
            </Link>
          </div>

        </div>
      </section>

      {/* ====================================
          2. СУРГУУЛИЙН ЗУРАГ
          Цэнхэр хэсэгтэй зөөлөн уусна
      ==================================== */}
      <section className="relative -mt-8 overflow-hidden bg-[#073C86]">

        {/* Шинэ тэнгэртэй зураг */}
        <img
          src="/school-banner.png"
          alt="Баруун бүсийн их сургуулийн барилга"
          className="block h-auto w-full"
        />

        {/* Зургийн дээд хэсгийн уусалт */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#073C86] via-[#073C86]/70 to-transparent sm:h-40 md:h-48" />

      </section>

      {/* ====================================
          3. ДӨРВӨН ӨНГӨЛӨГ КАРТ
      ==================================== */}
      <section className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {quickLinks.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                className="group flex min-h-[160px] gap-4 rounded-2xl border border-blue-100 bg-white p-5 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div
                  className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-white ${item.color}`}
                >
                  <Icon size={30} />
                </div>

                <div className="flex min-w-0 flex-1 flex-col">
                  <h2 className="text-lg font-extrabold text-[#07347C]">
                    {item.title}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {item.description}
                  </p>

                  <ArrowRight
                    size={21}
                    className="mt-auto self-end text-[#087BFA] transition group-hover:translate-x-1"
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
      <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
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
                className="group overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Мэдээний дээд хэсэг */}
                <div className="flex h-36 items-center justify-center bg-gradient-to-br from-[#074293] to-[#1590E8]">
                  <Newspaper
                    size={54}
                    className="text-white/80"
                  />
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

      {/* ====================================
          5. ТООН ҮЗҮҮЛЭЛТ — API 1
      ==================================== */}
      <section
        id="statistics"
        className="bg-gradient-to-r from-[#E3F1FF] to-[#F0F8FF] px-5 py-14 md:px-8"
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
                  className="rounded-2xl border border-blue-100 bg-white p-6 text-center shadow-sm"
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
      <section className="bg-[#07347C] px-5 py-14 text-white md:px-8">
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
