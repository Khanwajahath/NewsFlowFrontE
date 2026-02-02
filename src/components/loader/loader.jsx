export default function Loader() {
  return (
    <div className="p-2 bg-white d-flex ">
      <div className="row gap-4 ">
        {[1, 2, 3].map((item) => (
          <div key={item} className="col-12 col-md-3 w-25">
            <div className="card h-100 p-2" aria-hidden="true">
              <div className="card-body">
                <h5 className="card-title placeholder-glow bg-secondary rounded p-2">
                  <span className="placeholder col-6"></span>
                </h5>
                <p className="card-text placeholder-glow bg-secondary rounded p-2">
                  <span className="placeholder col-7"></span>
                  <span className="placeholder col-4"></span>
                  <span className="placeholder col-4"></span>
                  <span className="placeholder col-6"></span>
                  <span className="placeholder col-8"></span>
                  <span className="placeholder col-6"></span>
                  <span className="placeholder col-8"></span>
                </p>
                <a className="btn btn-primary disabled placeholder col-6"></a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
