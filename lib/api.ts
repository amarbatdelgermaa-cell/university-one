
/*
  Сургуулийн мэдээний вебийн API холболт
  Бүх API хүсэлтийг энэ файлаас хийнэ.
*/

// API серверийн үндсэн хаяг
const BASE_URL = "http://west.edu.mn:3000/api/v1";

// Серверээс мэдээлэл авах ерөнхий функц
async function getData(path: string) {
  const response = await fetch(`${BASE_URL}${path}`, {
    cache: "no-store",
  });

  // Сервер алдаа буцаавал мэдэгдэнэ
  if (!response.ok) {
    throw new Error(`API алдаа: ${response.status}`);
  }

  return response.json();
}

// API 1: Багш, оюутан, хөтөлбөр, тэнхимийн тоо
export function getStatistics() {
  return getData("/settings/toonmedee");
}

// API 2: Мэдээний ангиллууд
export function getCategories() {
  return getData("/newscategories");
}

// API 3: Хичээлийн улирал, долоо хоног
export function getSeasonInfo() {
  return getData("/settings/ognoo");
}

// API 4: Сонгосон ангиллын мэдээнүүд
export function getCategoryNews(categoryId: string) {
  return getData(
    `/news?category_id=${encodeURIComponent(categoryId)}&limit=50`
  );
}

// API 5: Мэдээний архив
export function getArchive() {
  return getData("/news/arhiv");
}
