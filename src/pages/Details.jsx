import { useParams, Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Details() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [show, setShow] = useState(null);

  
  const page = searchParams.get("page") || "0";
  const q = searchParams.get("q") || "";

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}`)
  .then(res => res.json())
  .then(data => setShow(data));
  }, [id]);

  if (!show) return <p className="p-10 text-center">Loading...</p>;

  return (
    <div className="min-h-screen bg-[#f8f7ff]">
      <div className="max-w-5xl mx-auto p-6">

        <Link
          to={`/?page=${page}&q=${q}`}
          className="inline-block mb-6 bg-white border border-slate-200 px-6 py-2.5 rounded-full font-bold text-slate-700 shadow-sm transition-all duration-300 hover:bg-violet-600 hover:text-white hover:border-violet-600"
        >
          ← رجوع
        </Link>

        <div className="bg-white rounded-[24px] p-6 md:p-10 flex flex-col md:flex-row gap-8 shadow-sm border">
          <img src={show.image?.original || show.image?.medium} className="w-full md:w-80 rounded-[16px] object-cover" alt={show.name} />
          <div>
            <h1 className="text-4xl font-black text-slate-800">{show.name}</h1>
            <div className="flex gap-2 mt-4 mb-6">
              <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm">{show.rating?.average} ⭐</span>
              <span className="bg-slate-100 px-3 py-1 rounded-full text-sm">{show.language}</span>
              <span className="bg-slate-100 px-3 py-1 rounded-full text-sm">{show.premiered?.slice(0,4)}</span>
            </div>
            <div dangerouslySetInnerHTML={{ __html: show.summary }} className="text-slate-600 leading-relaxed" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Details;