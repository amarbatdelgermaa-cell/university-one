import { connection } from "next/server";

import { Suspense } from "react";
import Link from "next/link";
import { getCategories, getCategoryNews } from "@/lib/api";

// Мэдээний ангиллын бүтэц
type Category = {
  _id: string;
  name: string;
};

// Мэдээний бүтэц
type News = {
  _id: string;
  title: string;
  description?: string;
  created_at: string;
};

// Хуудасны URL-аас category_id авна
type Props = {
  searchParams: Promise<{
    category_id?: string;
  }>;
};

// API мэдээллийг авч харуулах хэсэг
async function NewsContent({ searchParams }: Props) {
  await connection();
  const params = await searchParams;

  let categories: Category[] = [];
  let news: News[] = [];
  let error = "";

  try {
    // API 2: Мэдээний ангиллууд
    const categoryData = await getCategories();

    categories = categoryData.newsCategories ?? [];

    // Сонгосон ангиллын ID
    const selectedId =
      params.category_id || categories[0]?._id;

    if (selectedId) {
      // API 4: Сонгосон ангиллын мэдээнүүд
      const newsData = await getCategoryNews(selectedId);

      news = newsData.news ?? [];
    }
  } catch (err) {
    console.error("Мэдээний API алдаа:", err);
    error = "API сервертэй холбогдож чадсангүй.";
  }

  const selectedId =
    params.category_id || categories[0]?._id;

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Хуудасны гарчиг */}
      <section className="bg-blue-900 px-6 py-12 text-white">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold">
            Мэдээ мэдээлэл
          </h1>

          <p className="mt-3 text-blue-100">
            Сургуулийн мэдээ, зарлал болон үйл ажиллагаа
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-10">

        {/* Баруун бүсийн сургуулийн албан ёсны мэдээний эх сурвалж */}
        <section className="mb-10 flex flex-col gap-5 rounded-xl border border-blue-100 bg-[#EAF1F8] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="text-xs font-bold tracking-widest text-[#A87520]">АЛБАН ЁСНЫ ЭХ СУРВАЛЖ</p>
            <h2 className="mt-2 text-xl font-bold text-[#123C69]">Баруун бүсийн сургуулийн мэдээнүүд</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">Сургуулийн албан ёсны веб дэх мэдээ, зарлал, үйл ажиллагааны нийтлэлүүдийг үзэх.</p>
          </div>
          <a href="http://khovd.num.edu.mn:5000/news" target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center justify-center rounded-lg bg-[#123C69] px-5 py-3 font-semibold text-white transition hover:bg-[#1C5C98]">Албан ёсны мэдээ үзэх ↗</a>
        </section>
        {/* МУИС-ийн албан ёсны сайтаас баталгаажсан нийтлэлүүд */}
        <section className="mb-12">
          <h2 className="mb-5 text-2xl font-bold text-[#123C69]">Баруун бүсийн сургуулийн онцлох мэдээ</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { title: "Баруун бүсийн сургуульд Ном уншлагын танхим нээлээ", date: "2025-09-17", url: "https://news.num.edu.mn/?p=111811", summary: "Номын санг баяжуулах хамтын ажиллагааны хүрээнд жил бүр 100 нэр төрлийн ном хандивлахаар мэдээлжээ." },
              { title: "Баруун бүсийн сургуульд судалгааны хүрээлэн байгуулах асуудлыг хэлэлцжээ", date: "2026-01-28", url: "https://news.num.edu.mn/?p=113943", summary: "Ректорын зөвлөлийн хурлаар уг асуудлыг дахин хэлэлцэхээр хойшлуулсан." },
              { title: "Баруун бүсийн сургуульд оюутны хөгжлийн үйлчилгээний өдөрлөг зохион байгуулжээ", date: "2024-12-06", url: "https://news.num.edu.mn/?p=106756", summary: "Оюутны хөгжлийн үйлчилгээний мэдээллийг орон нутгийн салбар сургуулийн суралцагчдад хүргэсэн." },
            ].map((item) => (
              <a key={item.url} href={item.url} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-slate-200 bg-white p-6 transition hover:border-blue-300 hover:shadow-lg">
                <p className="text-xs text-slate-500">{item.date}</p>
                <h3 className="mt-3 text-lg font-bold leading-7 text-[#123C69]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.summary}</p>
                <span className="mt-5 inline-block font-semibold text-blue-800">Эх сурвалжийг нээх →</span>
              </a>
            ))}
          </div>
        </section>
        {/* API 2: Мэдээний ангиллууд */}
        <h2 className="mb-5 text-xl font-bold text-gray-900">
          Мэдээний ангилал
        </h2>

        <div className="mb-10 flex flex-wrap gap-3">
          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/news?category_id=${category._id}`}
              className={
                selectedId === category._id
                  ? "rounded-lg bg-blue-900 px-5 py-3 font-semibold text-white"
                  : "rounded-lg border bg-white px-5 py-3 font-semibold text-gray-700 hover:bg-blue-50"
              }
            >
              {category.name}
            </Link>
          ))}
        </div>

        {/* API 4: Ангиллын мэдээнүүд */}
        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          Мэдээний жагсаалт
        </h2>

        {error && (
          <p className="mb-6 rounded-lg bg-red-50 p-4 text-red-600">
            {error}
          </p>
        )}

        {!error && news.length === 0 && (
          <p className="rounded-lg bg-white p-6 text-gray-600">
            Энэ ангилалд одоогоор мэдээ алга.
          </p>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
            <article
              key={item._id}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              {/* Мэдээний ангилал */}
              <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-900">
                Мэдээ
              </span>

             {/* Мэдээний гарчиг — дарахад дэлгэрэнгүй хуудас нээгдэнэ */}
<h3 className="mt-4 text-lg font-bold text-gray-900">
  <Link
    href={`/news/${item._id}`}
    className="hover:text-blue-700 hover:underline"
  >
    {item.title}
  </Link>
</h3>

              {/* Мэдээний огноо */}
              <p className="mt-3 text-sm text-gray-500">
                {new Date(item.created_at).toLocaleDateString(
                  "mn-MN"
                )}
              </p>

              {/* Дэлгэрэнгүй унших холбоос */}
<Link
  href={`/news/${item._id}`}
  className="mt-5 inline-block font-semibold text-blue-700 hover:underline"
>
  Дэлгэрэнгүй унших →
</Link>
            </article>
          ))}
        </div>

      </div>
    </main>
  );
}

// API ачаалж байх үед
function LoadingNews() {
  return (
    <main className="p-10 text-center text-gray-600">
      Мэдээний мэдээлэл ачаалж байна...
    </main>
  );
}

// Next.js 16-д зориулсан Suspense
export default function NewsPage(props: Props) {
  return (
    <Suspense fallback={<LoadingNews />}>
      <NewsContent {...props} />
    </Suspense>
  );
}
