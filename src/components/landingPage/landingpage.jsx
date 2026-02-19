import { Link, useNavigate } from "react-router"
import bg from "../../../public/bg.png"
export function LandingPage(){
     

    return(
        <div className="flex  " 
      style={{
        backgroundImage: "url('/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
     <div className="p-4 h-screen flex flex-col justify-center items-center  ">
            <span className="text-white font-bold text-3xl">NewsFlow</span>
            <h1 className="text-white font-bold text-4xl">Your World, In Motion.</h1>
            <p className="text-white font-bold">Stay Ahead with real-time Global news aggregation</p>
            <div className="flex justify-between align-middle gap-2">
                        <div>
                            <Link to="/register">
                            <button className="bg-white text-black p-2 px-6   font-semibold  hover:bg-black hover:text-white"
                            style={{borderRadius:"5px"}}>
                                Create Account
                            </button>
                            </Link>
                        </div>
                        <div>
                            <Link to={'/login'}>
                            <button className="bg-white text-black p-2 px-6 font-semibold  hover:bg-black hover:text-white"
                            style={{borderRadius:"5px"}}>
                                Existing User
                            </button>
                            </Link>
                        </div>
            </div>
     </div>
        
        </div>
    )
}