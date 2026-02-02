import { useEffect, useState } from "react";
 
export function NewsCat() {
  const [categories, setCategories] = useState([]);
   
  useEffect(() => {
    fetch(`https://news-flow-backend.vercel.app/api/news/top-headlines/sources`)
      .then(res => res.json())
      .then(data => {
        const temp=data.sources
        const uniqueCat = [
          ...new Set(temp.map(item => item.category))
        ];
        uniqueCat.map(item =>
            item.charAt(0).toUpperCase() + item.slice(1))
        uniqueCat.unshift("All")
        setCategories(uniqueCat);
      })
      .catch(err => console.error(err));
  }, [ ]);

  return (
   <div className="mt-2 bg-yellow-300 rounded-2xl">
  <div className=" flex flex-wrap md:flex-nowrap justify-around p-2 text-white font-bold ">
    {categories.map((cat, index) => (
      <button 
        className="bg-indigo-600 hover:not-focus:bg-indigo-700   px-2 py-1 hover:cursor-pointer rounded  mt-1" 
        key={index}
      >
        {cat}
      </button>
    ))}
  </div>
</div>

  );
}