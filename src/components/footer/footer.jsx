export function Footer(){
    return(
        <div className="d-flex justify-content-between  align-items-center p-3">
            <div>
                <div className="d-flex gap-2  align-items-end my-0">
            <span className='fw-bold bi bi-newspaper text-primary fs-3'></span>
            <h5 className="fw-bold text-white">NewsFlow</h5>
            </div>
            <span className="text-white">Empowering your daily dose of news</span>
            </div>
            <div className="d-flex justify-content-between text-white gap-4">
                <span>Privacy Policy</span>
                <span>Terms of Services</span>
                <span>Contact</span>
            </div>
            <div className="text-white">
                <i className="bi bi-c-circle"></i> 
                <span>Copyright NewsFlow.Inc. <br></br>All rights Reserverd</span>
            </div>
        </div>
    )
}