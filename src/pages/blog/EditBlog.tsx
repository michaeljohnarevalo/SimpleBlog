import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch,  RootState } from "../../app/store";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editBlog } from "../../app/blogThunks";

export default function EditBlog(){
    const [ntitle,setTitle] = useState('');
    const [ncontent, setContent] = useState('');
    const {id} = useParams<{id:string}>();
    const loading = useSelector((state:RootState)=> state.blogs.loading)
    const existdata = useSelector((state:RootState)=> state.blogs.blogs.find(b => b.id === id));
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate()

    useEffect(()=>{
        if(existdata){
            setTitle(existdata.title)
            setContent(existdata.content)
        }
    },[existdata])

    const handleUpdate=()=>{
        dispatch(editBlog({title:ntitle,content:ncontent,id:id!}))
    }

    if(loading) return <h1 className="text-center text-lg md:text-xl p-4 ">Editing...</h1>
        return (
            <>
        <div className="px-10 py-10"><button onClick={()=>navigate('/')} className="text-sm px-6 py-1 text-gray-500 border rounded-lg hover:text-blue-700 ">Back</button></div>
        <div className="flex flex-col items-center justify-center gap-y-2 px-4">
            <h1>Create blog</h1>
            <form onSubmit={handleUpdate}>
                <label>Title:</label>
                <input
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={e => setTitle(e.target.value)}
                value={ntitle}
                placeholder="Title"
                />
                 <label>Content:</label>
                 <textarea onChange={e => setContent(e.target.value)} placeholder="Content"
                value={ncontent}
                className="w-full border rounded-lg px-3 py-2 h-40 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <div >
                    <label>Upload Images:(optional)</label>
                    <input
                    type="file"
                    className=" text-sm text-gray-500 px-4 py-4 file:mr-6 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                </div>
                <button type="submit" className="text-xs px-4 py-1 text-gray-500  border rounded-lg hover:text-blue-500 mb-4">Edit</button>
            </form>
         </div>
        </>
    )
}