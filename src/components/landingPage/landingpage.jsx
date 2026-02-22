import { Link, useNavigate } from "react-router"
import bg from "../../../public/bg.png"
export function LandingPage(){
     

    return(
<div
  className="bg-cover bg-top md:bg-center bg-no-repeat min-h-screen w-full"
  style={{
    backgroundImage: "url('/bg.png')",
  }}
>
     <div className="p-4 h-screen flex flex-col justify-center items-center  ">
            <span className="text-white font-bold text-7xl mb-1">NewsFlow</span>
            <h1 className="text-white font-bold text-5xl
            font-mono">Your World, In Motion.</h1>
            <p className="text-white  ">Stay Ahead with real-time Global news aggregation</p>
            <div className="flex justify-between align-middle gap-2 mt-2">
                        <div>
                            <Link to="/register">
                            <button className="bg-white text-black p-2 px-6 font-semibold border-b-2 border-transparent hover:border-black"
  style={{ borderRadius: "5px" }}>
  Create Account
</button>
                            </Link>
                        </div>
                        <div>
                            <Link to={'/login'}>
                            <button className="bg-white text-black p-2 px-6 font-semibold border-b-2 border-transparent hover:border-black"
  style={{ borderRadius: "5px" }}>
  Existing User
</button>
                            </Link>
                        </div>
            </div>
     </div>
        
        </div>
    )
}