import { useDispatch, useSelector } from "react-redux"
import { supabase } from "../../app/supabase"
import { logout } from "../../app/authSlice"
import { Link } from "react-router-dom"
import type { RootState } from "../../app/store"


export default function Navbar(){
    const dispatch = useDispatch()
   const user = useSelector((state:RootState) => state.auth.user) 

    const handleLogout=async()=>{
        const { error } = await supabase.auth.signOut()
        dispatch(logout())
        if(error){
                    throw error
        }   

    }
    return(
    <nav className="flex justify-between px-4 py-3">
            <Link
            to="/"
            className="text-2xl text-blue-900 hover:text-gray-700"
            >Blogs</Link>
            <div className="text-lg flex gap-2"> 
                {user ? (
                    <>
                    <Link to="/create"
                    className="hover:text-blue-500"
                    >Create</Link>
                    <button onClick={handleLogout}
                    className=" hover:text-red-500"
                    >Logout</button>
                    </>):(
                        <>
                            <Link 
                            to="/login"
                            className="hover:text-blue-500"
                            >Login</Link>   
                            <Link to="/register"
                            className="hover:text-blue-500"
                            >
                            Register
                            </Link>    
                        </>
                    )
                }
            </div>
        </nav>
    )
}