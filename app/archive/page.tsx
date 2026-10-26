import { connection } from "next/server";

import { Suspense } from "react";
import { getArchive } from "@/lib/api";

// API 5-аас ирэх архивын бүтэц
type ArchiveItem = {
  on: string;  // Он
  sar: string; // Сар
};

type ArchiveResponse = {
  success: boolean;
  content: ArchiveItem[];
};

// Архивын мэдээллийг серверээс авах
async function ArchiveContent() {
  await connection();
  let archive: ArchiveItem[] = [];
  let error = "";

  try {
    const data = (await getArchive()) as ArchiveResponse;
    archive = data.content ?? [];
  } catch (err) {
    console.error("Архивын API алдаа:", err);
    error = "Архивын мэдээлэл авахад алдаа гарлаа.";
  }

  // Он тус бүрийн саруудыг бүлэглэх
  const grouped = archive.reduce<Record<string, string[]>>(
    (result, item) => {
      if (!result[item.on]) {
        result[item.on] = [];
      }

      if (!result[item.on].includes(item.sar)) {
        result[item.on].push(item.sar);
      }

      return result;
    },
    {}
  );

  // Шинэ оныг эхэнд харуулах
  const years = Object.keys(grouped).sort(
    (a, b) => Number(b) - Number(a)
  );

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Хуудасны гарчиг */}
      <section className="bg-blue-900 px-6 py-12 text-white">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold">
            Мэдээний архив
          </h1>
          <p className="mt-3 text-blue-100">
            Сургуулийн өмнөх он, саруудын мэдээний архив
          </p>
        </div>
      </section>

      {/* Архивын жагсаалт */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        {error && (
          <p className="mb-6 rounded-lg bg-red-50 p-4 text-red-600">
            {error}
          </p>
        )}

        {!error && years.length === 0 && (
          <p className="rounded-lg bg-white p-6 text-gray-600">
            Архивын мэдээлэл олдсонгүй.
          </p>
        )}

        <div className="space-y-6">
          {years.map((year) => (
            <div
              key={year}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              {/* Он */}
              <h2 className="mb-5 text-2xl font-bold text-blue-900">
                📅 {year} он
              </h2>

              {/* Тухайн оны сарууд */}
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
                {grouped[year]
                  .sort((a, b) => Number(a) - Number(b))
                  .map((month) => (
                    <div
                      key={`${year}-${month}`}
                      className="rounded-lg bg-blue-50 px-3 py-4 text-center font-medium text-blue-900"
                    >
                      {Number(month)}-р сар
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

// Мэдээлэл ачаалж байх үеийн текст
function LoadingArchive() {
  return (
    <main className="p-10 text-center text-gray-600">
      Архивын мэдээлэл ачаалж байна...
    </main>
  );
}

// Next.js 16-ийн Suspense
export default function ArchivePage() {
  return (
    <Suspense fallback={<LoadingArchive />}>
      <ArchiveContent />
    </Suspense>
  );
}
