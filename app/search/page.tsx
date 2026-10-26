import { connection } from "next/server";
import Link from "next/link";
import { Suspense } from "react";
import { Search } from "lucide-react";
import { getCategories, getCategoryNews } from "@/lib/api";

type News = { _id: string; title: string; description?: string; created_at?: string; };
type Category = { _id: string; name: string };
type Props = { searchParams: Promise<{q?: string}> };

// Хайлтын үгтэй таарах мэдээг 5 API-ийн одоо ашиглаж буй мэдээний эх сурвалжаас хайна.
async function Results({searchParams}:Props) {
  await connection();
  const {q=""} = await searchParams;
  const keyword=q.trim().toLocaleLowerCase("mn");
  let news: News[]=[]; let error="";
  if(keyword) {
    try {
      const data=await getCategories();
      const categories:Category[]=data.newsCategories??[];
      const responses=await Promise.allSettled(categories.map(c=>getCategoryNews(c._id)));
      const all=responses.flatMap(r=>r.status==="fulfilled" ? (r.value.news??[]) as News[] : []);
      news=Array.from(new Map(all.map(n=>[n._id,n])).values()).filter(n=>(n.title+" "+(n.description??"")).toLocaleLowerCase("mn").includes(keyword));
      news.sort((a,b)=>(b.created_at??"").localeCompare(a.created_at??""));
    }catch { error="Мэдээллийн сервертэй холбогдож чадсангүй."; }
  }
  return <section className="mx-auto max-w-5xl px-5 py-10">
    <form action="/search" className="flex flex-col gap-3 sm:flex-row">
      <input aria-label="Хайх үг" name="q" defaultValue={q} placeholder="Мэдээний гарчиг, түлхүүр үг..." className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-5 py-3 text-slate-900 focus:outline-blue-600"/>
      <button className="rounded-xl bg-[#07347C] px-7 py-3 font-bold text-white">Хайх</button>
    </form>
    {!keyword ? <p className="mt-8 text-slate-600">Хайх үгээ бичээд “Хайх” товчийг дарна уу.</p>
    :error ? <p className="mt-8 text-red-700">{error}</p>
    : <><h2 className="mt-8 text-xl font-bold text-[#07347C]">Хайлтын үр дүн ({news.length})</h2>
      <div className="mt-5 space-y-4">{news.length===0 ? <p className="rounded-xl bg-white p-6 text-slate-600">Тохирох мэдээ олдсонгүй.</p>:
      news.map(n=><Link key={n._id} href={`/news/${n._id}`} className="block rounded-xl border bg-white p-5 hover:border-blue-400"><h3 className="font-bold text-[#07347C]">{n.title}</h3><p className="mt-2 text-sm text-slate-500">{n.created_at?new Date(n.created_at).toLocaleDateString("mn-MN"):""}</p></Link>)}</div>
    </>}
  </section>;
}
export default function SearchPage(props:Props) {
  return <main className="min-h-screen bg-slate-50"><div className="bg-[#07347C] px-5 py-12 text-white"><div className="mx-auto max-w-5xl"><div className="flex items-center gap-3"><Search size={32}/><h1 className="text-3xl font-bold">Мэдээ хайх</h1></div></div></div><Suspense fallback={<p className="p-8 text-center">Хайлт ачаалж байна...</p>}><Results {...props}/></Suspense></main>;
}