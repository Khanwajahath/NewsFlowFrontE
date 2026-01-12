export function Carousal({content}){
    return(
        <div className="carousel-item">
          <img
            src={content.urlToImage}
            className="d-block w-100"
            alt="Third slide"
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>{content.title}</h5>
            <p>{content.desription}</p>
          </div>
        </div>
    )
}