import { useState } from "react";
import Header from "./Headar";

const Login = () => {
    const [isSignInForm, setIsSignInForm ] = useState(true);

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm)
    }
    return (
        <div>
            <Header/>
            <div className="absolute">
                <img 
                alt="bg-img" 
                src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" />
            </div>
            <form className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white opacity-80">
                <h1 className="font-bold text-3xl py-4">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
                {
                    !isSignInForm && 
                    <input 
                    type="text"
                    placeholder="full Name"
                    className="p-4 my-4 w-full bg-gray-700"
                    />
                 }
                <input
                 type="text" 
                 placeholder="Email Address"
                 className="p-4 my-4 w-full bg-gray-300 " 
                 />
                 
                <input 
                type="password" 
                placeholder="password" 
                className="p-4 my-4 w-full bg-gray-300" 
                />
                <button className="p-4 my-6 bg-red-700 w-full rounded-lg">{isSignInForm ? "Sign In" : "Sign Up"}</button>
                <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
                    {isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now..."}
                </p>
            </form>
        </div>
    )
}

export default Login;