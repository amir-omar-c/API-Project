import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

function Home() {
  const [allShows, setAllShows] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  const page = parseInt(searchParams.get("page") || "1") - 1;

  const ITEMS_PER_PAGE = 10;
  const apiPage = Math.floor(page / 25);
  const indexInApiPage = page % 25;

  useEffect(() => {
    if (query) {
      fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
  .then(res => res.json())
  .then(data => setAllShows(data.map(i => i.show)));
    } else {
      fetch(`https://api.tvmaze.com/shows?page=${apiPage}`)
  .then(res => res.json())
  .then(data => setAllShows(data));
    }
  }, [apiPage, query]);

  const displayedShows = query
? allShows.slice(0, 10)
    : allShows.slice(indexInApiPage * ITEMS_PER_PAGE, (indexInApiPage * ITEMS_PER_PAGE) + ITEMS_PER_PAGE);

  const goToPage = (newPage) => {
    setSearchParams({ page: newPage + 1, q: query });
  };

  return (
    <div className="min-h-screen bg-[#f8f7ff]">
      <div className="bg-white/80 backdrop-blur border-b border-violet-100 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-black text-violet-600">TV<span className="text-slate-800">FLIX</span></h1>
          <span className="text-sm bg-violet-100 text-violet-600 px-3 py-1 rounded-full">صفحة {page + 1}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative bg-white rounded-[20px] shadow-xl border border-slate-100 flex items-center p-2">
            <div className="pl-5 text-slate-400">🔍</div>
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSearchParams({ page: page + 1, q: e.target.value });
              }}
              placeholder="ابحث..."
              className="w-full px-4 py-3 bg-transparent outline-none text-slate-700"
            />
            <button className="bg-slate-900 text-white px-7 py-3 rounded-[14px] font-bold">بحث</button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {displayedShows.map(show => (
            <Link key={show.id} to={`/show/${show.id}?page=${page + 1}&q=${query}`} className="group">
              <div className="bg-white rounded-[20px] p-2 shadow-sm hover:shadow-xl transition border border-slate-100">
                <div className="overflow-hidden rounded-[14px]">
                  <img src={show.image?.medium} className="w-full h-[300px] object-cover group-hover:scale-105 duration-500" alt={show.name} />
                </div>
                <div className="p-3">
                  <h2 className="font-bold text-slate-800 truncate">{show.name}</h2>
                  <span className="text-[11px] bg-amber-100 text-amber-700 px-2 py-1 rounded-full font-bold mt-2 inline-block">{show.rating?.average || "NEW"} ★</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center items-center gap-3 mt-14">
          <button
            disabled={page === 0}
            onClick={() => goToPage(page - 1)}
            className="px-6 py-3 rounded-full bg-white border text-slate-600 disabled:opacity-30 hover:bg-slate-900 hover:text-white transition"
          >
            السابق
          </button>
          <div className="bg-white border px-6 py-3 rounded-full text-sm font-bold">الصفحة {page + 1}</div>
          <button
            onClick={() => goToPage(page + 1)}
            className="px-6 py-3 rounded-full bg-slate-900 text-white hover:bg-violet-600 transition"
          >
            التالي
          </button>
        </div>
      </div>
    </div>
  );
}
export default Home;