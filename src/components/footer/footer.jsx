import "./footer.css";
export function Footer() {
  return (
    <div className=" footer">
      <div className="mt-2 logo">
        <div className="d-flex gap-2  align-items-end my-0">
          <span className="fw-bold bi bi-newspaper text-primary fs-3"></span>
          <h5 className="fw-bold text-white">NewsFlow</h5>
        </div>
        <span className="text-white">Empowering your daily dose of news</span>
      </div>
      <div className="d-flex justify-content-between text-white gap-4 mt-2">
        <span>Privacy Policy</span>
        <span>Terms of Services</span>
        <span>Contact</span>
      </div>
      <div className="text-white mt-2">
        <i className="bi bi-c-circle"></i>
        <span>
          Copyright NewsFlow.Inc. <br></br>All rights Reserverd
        </span>
      </div>
    </div>
  );
}
