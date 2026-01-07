import { useEffect, useState } from "react";
 
 
export function Demofetch() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:4000/news?q=AI`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data.articles || []);
      });
  }, []);
  return <div className="text-white">{console.log(data)}</div>;
}
