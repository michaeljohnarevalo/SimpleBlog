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
        <div className="flex justify-center px-4 mt-16">
            <div className=" w-full max-w-sm flex flex-col gap-4">
                <h2 className="text-center text-xl 
                font-bold text-blue-500  ">Login</h2>
                <input
                placeholder="Email"
                onChange={e => setEmail(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 
                outline-none"
                />
                <input
                type="passwords"
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 
                outline-none"
                />
                <button onClick={handleLogin}
                className="text-xs px-4 py-1 text-gray-500 
                border rounded-lg hover:text-blue-500"
                >Login</button>
            </div>
        </div>
    )
}