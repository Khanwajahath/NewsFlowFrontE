import { Link, useNavigate } from "react-router"

export function LandingPage(){
     

    return(
        <div className="flex justify-center content-center">
            <div>
                <Link to={'/register'}>
                    Create Account
                </Link>
            </div>
            <div>
                <Link to={'/login'}>
                Existing User?
                </Link>
            </div>
        </div>
    )
}