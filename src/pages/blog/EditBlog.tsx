import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch,  RootState } from "../../app/store";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { editBlog } from "../../app/blogThunks";

export default function EditBlog(){
    const [title,setTitle] = useState('');
    const [content, setContent] = useState('');
    const loading = useSelector((state:RootState)=> state.blogs.loading)
    const {id} = useParams<{id:string}>();
    const dispatch = useDispatch<AppDispatch>();

    const handleUpdate=()=>{
        dispatch(editBlog({title,content,id:id!}))
    }
    if(loading) return <h1 className="text-center text-lg md:text-xl p-4 ">Editing...</h1>
        return (
        <div className="flex flex-col items-center gap-y-2 px-4">
        <h1 className="px-5 py-2 text-center ">Edit Blog</h1>
            <input
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" 
            onChange={e => setTitle(e.target.value)}
            placeholder="Title"
            />
            <textarea onChange={e => setContent(e.target.value)} placeholder="Content"  className="w-full border rounded-lg px-3 py-2 h-40 focus:ring-2 focus:ring-blue-500 outline-none"/>
            <button onClick={handleUpdate} className="text-xs px-4 py-1 text-gray-500  border rounded-lg hover:text-blue-500 mb-4">Update</button>
            </div>
    )
}