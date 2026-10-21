
import { Suspense } from "react";
import Link from "next/link";
import { getCategories, getCategoryNews } from "@/lib/api";

// Мэдээний бүтэц
type News = {
  _id: string;
  title: string;
  description?: string;
  created_at?: string;
  blocks?: {
    type: string;
    data?: {
      text?: string;
    };
  }[];
};

// Ангиллын бүтэц
type Category = {
  _id: string;
  name: string;
};

// URL-аас мэдээний ID авах
type Props = {
  params: Promise<{ id: string }>;
};

// Мэдээний мэдээллийг API-аас хайх
async function NewsDetailContent({ params }: Props) {
  const { id } = await params;

  let article: News | undefined;
  let categoryName = "";
  let error = "";

  try {
    const categoryData = await getCategories();

    const categories: Category[] =
      categoryData.newsCategories ?? [];

    // Ангилал бүрийн мэдээнээс ID-гаар хайна
    for (const category of categories) {
      const newsData = await getCategoryNews(category._id);
      const newsList: News[] = newsData.news ?? [];

      const found = newsList.find(
        (item) => item._id === id
      );

      if (found) {
        article = found;
        categoryName = category.name;
        break;
      }
    }
  } catch (err) {
    console.error("Мэдээний API алдаа:", err);
    error = "Мэдээний мэдээлэл авахад алдаа гарлаа.";
  }

  if (error) {
    return (
      <main className="mx-auto max-w-4xl p-10">
        <p className="text-red-600">{error}</p>
        <Link href="/news" className="text-blue-700">
          ← Мэдээ рүү буцах
        </Link>
      </main>
    );
  }

  if (!article) {
    return (
      <main className="mx-auto max-w-4xl p-10">
        <h1 className="text-2xl font-bold">
          Мэдээ олдсонгүй
        </h1>
        <p className="mt-3 text-gray-600">
          Энэ мэдээ API-аас ирсэн жагсаалтад алга байна.
        </p>
        <Link
          href="/news"
          className="mt-5 inline-block text-blue-700"
        >
          ← Мэдээ рүү буцах
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Мэдээний гарчиг */}
      <section className="bg-blue-900 px-6 py-12 text-white">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/news"
            className="text-blue-100 hover:underline"
          >
            ← Бүх мэдээ
          </Link>

          <p className="mt-6 text-sm text-blue-200">
            {categoryName}
          </p>

          <h1 className="mt-3 text-3xl font-bold">
            {article.title}
          </h1>

          {article.created_at && (
            <p className="mt-4 text-sm text-blue-100">
              {new Date(
                article.created_at
              ).toLocaleDateString("mn-MN")}
            </p>
          )}
        </div>
      </section>

      {/* Мэдээний агуулга */}
      <section className="mx-auto max-w-4xl px-6 py-12">
        <article className="rounded-xl bg-white p-8 shadow-sm">
          {article.description && (
            <p className="mb-6 text-lg leading-8 text-gray-700">
              {article.description}
            </p>
          )}

          {/* Мэдээний текстэн догол мөрүүд */}
          {article.blocks
            ?.filter(
              (block) =>
                block.type === "paragraph" &&
                block.data?.text
            )
            .map((block, index) => (
              <p
                key={index}
                className="mb-5 leading-8 text-gray-700"
              >
                {block.data?.text?.replace(/<[^>]*>/g, "")}
              </p>
            ))}

          {!article.description &&
            !article.blocks?.some(
              (block) =>
                block.type === "paragraph" &&
                block.data?.text
            ) && (
              <p className="text-gray-500">
                Энэ мэдээний дэлгэрэнгүй текст алга.
              </p>
            )}
        </article>
      </section>
    </main>
  );
}

// Ачаалж байх үед
function LoadingDetail() {
  return (
    <main className="p-10 text-center">
      Мэдээ ачаалж байна...
    </main>
  );
}

// Next.js-д шаардлагатай default export
export default function NewsDetailPage(props: Props) {
  return (
    <Suspense fallback={<LoadingDetail />}>
      <NewsDetailContent {...props} />
    </Suspense>
  );
}
