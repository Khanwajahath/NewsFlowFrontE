// components/carousel/carousel.jsx
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function Carousel({ content }) {
  if (!content || content.length === 0) return null;

  return (
    <div
      id="newsCarousel"
      className="carousel slide p-3 rounded-4 sm:w-100"
      style={{width:"70%"}}
      data-bs-ride="carousel"
    >
      {/* Indicators */}
      <div className="carousel-indicators">
        {content.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#newsCarousel"
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
            aria-current={index === 0}
          />
        ))}
      </div>

      {/* Slides */}
      <div className="carousel-inner">
        {content.map((item, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <img
              src={item.urlToImage || "/fallback.jpg"}
              className="d-block w-100 rounded-4"
              alt={item.title}
              style={{ height: "400px", objectFit: "cover" }}
            />

            <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
              <h5>{item.title}</h5>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#newsCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" />
      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#newsCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" />
      </button>
    </div>
  );
}
