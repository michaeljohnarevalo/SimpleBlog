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
                <div className="flex justify-center px-4 mt-16">
            <div className=" w-full max-w-sm flex flex-col gap-4">
                <h2 className="text-center text-xl 
                font-bold text-blue-500  ">Register</h2>
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
                <button onClick={handleRegister}
                className="text-xs px-4 py-1 text-gray-500 
                border rounded-lg hover:text-blue-500"
                >Register</button>
            </div>
        </div>
    )
}