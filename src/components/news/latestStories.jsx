import { useEffect, useState } from "react";
import "./latest.css";
export function LatestStories() {
  
  const categories = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];

  const [stories, setStories] = useState({});

  useEffect(() => {
    const requests = categories.map((category) =>
      fetch(
        `http://localhost:4000/news/latest?category=${category}`
      )
        .then((res) => res.json())
        .then((data) => ({
          category,
          article: data.articles[0],
        }))
    );

    Promise.all(requests)
      .then((results) => {
        const resultObj = {};
        results.forEach((r) => {
          resultObj[r.category] = r.article;
        });
        setStories(resultObj);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className=" latest-stories p-3">
      <h4 className="text-white">Latest Stories</h4>
      <div className="row g-3 p-2">
        {Object.values(stories).map((item, index) => (
          <div key={index} className="col-md-4 d-flex">
            <div className="d-flex flex-column card">
              <img
                src={item.urlToImage}
                className="card-img-top"
                style={{ height: "180px", objectFit: "cover" }}
                alt="news"
              />
              <div className=" card-body text-white text-white ">
                <div className="p-2">
                  <h6 className="fw-bold card-title">{item.title}</h6>
                  <span className="fs-6 desc card-text">{item.description}</span>
                   <a href={item.url} target="blank" class="stretched-link float-end">Read More</a>
                </div>
                <div className="d-flex gap-2 align-items-center p-2 mt-1">
                  <i className="bi bi-clock-fill"></i>
                  <span>
                    {Math.floor(
                      (new Date() - new Date(item.publishedAt)) / (1000*60*60)
                    )}{" "}
                    Minutes ago
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
