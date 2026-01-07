 import './header.css'
export function NewsHeader() {
    const routes=["Everything","Top Headlines","Sources"]
  return (
    
      <div className="d-flex gap-3 justify-content-between align-items-center mt-2 px-3 ">

        <div className="d-flex gap-2  align-items-end my-0">
            <span className='fw-bold bi bi-newspaper text-primary fs-3'></span>
            <h5 className="fw-bold text-white">NewsFlow</h5>
        </div>

      <div className="list-unstyled d-flex gap-2 my-0">
        {routes.map((cat,index) => (
        <button className=" btn fs-6 fw-semibold m-0 rounded-5 fw-lightbold text-white cat-btn" key={index}>{cat}</button> 
        ))}
      </div>
        
        <div className="input-group w-25">
            <input className="form-control w-25 my-0 search input-placeholder" placeholder="search news,sources ..."></input>
            <i className="bi bi-search input-group-text " style={{ cursor:'pointer'}}></i>
        </div>
      </div>
   
  );
}
