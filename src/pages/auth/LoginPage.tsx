import { useState } from "react"
import { supabase } from "../../app/supabase";
import { useDispatch } from "react-redux";
import { login } from "../../app/authSlice";
import { useNavigate } from "react-router-dom";

export default function LoginPage(){
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin= async()=>{
    const { data, error } = await supabase.auth.signInWithPassword({email,password})
    if(!error){
        console.log("Logged In");
        dispatch(login(data.user))  
        navigate("/")
     } 
    }

    return(
        <div className="flex flex-col items-center justify-center px-4 mt-16 gap-4 ">
            <h1 className=" text-center text-xl 
                font-bold text-blue-500 ">Login</h1>
            <form className=" w-full max-w-sm flex flex-col gap-4" onSubmit={e=> {e.preventDefault(); handleLogin()}}>
                <label>Email:</label>
                <input
                placeholder="Email"
                onChange={e => setEmail(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 
                outline-none"
                />

                <label>Password:</label>
                <input
                type="password"
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 
                outline-none"
                />
                <button type="submit" className="text-xs px-4 py-1 text-gray-500 
                border rounded-lg hover:text-blue-500">
                    Login
                </button>
            </form>
        </div>
    )
}