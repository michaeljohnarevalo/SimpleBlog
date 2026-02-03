import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch,  RootState } from "../../app/store";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { createBlog,uploadImage } from "../../app/blogThunks";
import { useNavigate } from "react-router-dom";

export default function CreateBlog(){

    const loading = useSelector((state:RootState)=> state.blogs.loading);
    const [title, setTitle] = useState('');
    const [content,setContent] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const userId = useSelector((state:RootState) => state.auth.user?.id)
    const [image,setImage] = useState<File | null>(null)
    const navigate = useNavigate()


    const handleSubmit =async (e: FormEvent)=>{ 
        e.preventDefault()
        try{
            let imageUrl= "";

            if(image){
                const result = await dispatch(uploadImage({file:image}))
                if(uploadImage.fulfilled.match(result)){
                    imageUrl = result.payload
                }
            }

            //
            dispatch(createBlog({
                title,
                content,
                user_id: userId!,
                image:imageUrl
            }))

            setContent('')
            setTitle('')
            setImage(null)
            navigate('/')
        }catch(error){
            console.error("failed to create a blog", error)
        }
    }



    const handleFileChange=(e: ChangeEvent<HTMLInputElement>)=>{
        const file =  e.target.files?.[0]
        if(file){
            setImage(file);
        }
    }

        if(loading){
        return(
            <h1 className="text-center ">Creating..</h1>
        )
    }
    return(
    <>
    <div className="px-10 py-10"><button onClick={()=>navigate('/')} className="text-sm px-6 py-1 text-gray-500 border rounded-lg hover:text-blue-700 ">Back</button></div>
    <div className="flex flex-col items-center justify-center gap-y-2 px-4">
        <h1>Create blog</h1>
        <form onSubmit={handleSubmit}>
            <label>Title:</label>
            <input
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={e => setTitle(e.target.value)}
            placeholder="Title"
            />
            <label>Content:</label>
            <textarea onChange={e => setContent(e.target.value)} placeholder="Content"
            className="w-full border rounded-lg px-3 py-2 h-40 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <div >
                <label>optional:</label>
                <input
                type="file"
                className=" text-sm text-gray-500 px-4 py-4 file:mr-6 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                onChange={handleFileChange}
                />
            </div>
            <button type="submit" className="text-xs px-4 py-1 text-gray-500  border rounded-lg hover:text-blue-500 mb-4">Create</button>
        </form>
        </div>
        </>
    )
}