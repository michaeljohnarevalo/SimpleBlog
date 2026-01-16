
import { Link } from "react-router-dom"
import type { Blog } from "../app/blogSlice";

interface BlogProps{
    blog:Blog,
    currentId?:string, 
    onDelete:(id:string) => void  
}

export default function BlogCard({blog,currentId,onDelete}:BlogProps){
    const isOwner = blog.user_id === currentId



    const formatDate = (dateString:string)=>{
        const date = new Date(dateString);
        return date.toLocaleDateString();
    }
    return(
                <div className="bg-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition flex flex-col h-full ">
            <h3  className="text-xl font-semibold mb-2 line-clamp-2">{blog.title}</h3>
            <p className="text-md text-gray-600 line-clamp-3 mb-4 flex-grow">{blog.content}</p>
            
            <div className="flex justify-between items-center text-xs text-gray-700">
                <h6 >{formatDate(blog.created_at)}</h6>
                <div  className="flex gap-3 ">
                    {isOwner && (
                    <>
                    <Link to={`/edit/${blog.id}`} className="hover:text-blue-500">Edit</Link>
                    <button onClick={()=> onDelete(blog.id)} className="hover:text-red-500">Delete</button>
                    </>
                )}
                </div>
            </div>
        </div>
    )
}
