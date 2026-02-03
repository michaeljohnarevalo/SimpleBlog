import { useState } from "react"
import { supabase } from "../../app/supabase";
import { useNavigate } from "react-router-dom";


export default function RegisterPage(){
   const [email,setEmail] = useState('');
   const [password,setPassword] = useState('')
    const navigate = useNavigate()

   const handleRegister = async()=>{
    const { error } = await supabase.auth.signUp({email,password})
       if(!error){
            console.log("Registered"); 
            navigate("/")
        }
   }


    return(
        <div className="flex flex-col items-center justify-center px-4 mt-16 gap-4 ">
            <h1 className=" text-center text-xl 
                font-bold text-blue-500 ">Register</h1>
            <form className=" w-full max-w-sm flex flex-col gap-4" onSubmit={e=> {e.preventDefault(); handleRegister()}}>
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
                    Register
                </button>
            </form>
        </div>
    )
}