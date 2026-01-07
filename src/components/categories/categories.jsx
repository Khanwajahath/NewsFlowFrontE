import { useEffect, useState } from "react";
import './cat.css'
export function NewsCat() {
  const [categories, setCategories] = useState([]);
   
  useEffect(() => {
    fetch(`http://localhost:4000/news/categories`)
      .then(res => res.json())
      .then(data => {
        const temp=data.sources
        const uniqueCat = [
          ...new Set(temp.map(item => item.category))
        ];
        uniqueCat.unshift("All")
        setCategories(uniqueCat);
      })
      .catch(err => console.error(err));
  }, [ ]);

  return (
      <div className="d-flex  gap-3 justify-content-between align-items-center my-0 text-white">
      <div className="d-flex gap-2 p-2 my-0 catbtns  top-0">
        {categories.map((cat,index) => (
         <button className=" btn  fs-6 fw-semibold mx-1 rounded-5 text-white catbtn" key={index}>{cat}</button> 
        ))}
      </div>
      </div>
  );
}