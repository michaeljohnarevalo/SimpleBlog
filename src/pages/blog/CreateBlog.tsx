import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch,  RootState } from "../../app/store";
import { useState } from "react";
import { createBlog } from "../../app/blogThunks";

export default function CreateBlog(){

        const loading = useSelector((state:RootState)=> state.blogs.loading);
    const [title, setTitle] = useState('');
    const [content,setContent] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const userId = useSelector((state:RootState) => state.auth.user?.id)
    
     const handleClick=()=>{
        dispatch(createBlog({title, content, user_id:userId}));
    }

        if(loading){
        return(
            <h1 className="text-center ">Creating..</h1>
        )
    }
    return(
               <div className="flex flex-col items-center gap-y-2 px-4">
        <h1>Create blog</h1>
        <input
        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
        />
        <textarea onChange={e => setContent(e.target.value)} placeholder="Content"
            className="w-full border rounded-lg px-3 py-2 h-40 focus:ring-2 focus:ring-blue-500 outline-none"
            />
        <button onClick={handleClick}  className="text-xs px-4 py-1 text-gray-500  border rounded-lg hover:text-blue-500 mb-4">Create</button>
        </div>
    )
}