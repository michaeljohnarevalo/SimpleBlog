import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../app/store";
import BlogCard from "../../components/BlogCard";
import { deleteBlog, fetchBlog } from "../../app/blogThunks";
import { useEffect } from "react";
import { Pagination } from "@mui/material";
import { setPage } from "../../app/blogSlice";

export default function BlogList(){
    const {blogs, loading,total,page,pageSize} = useSelector((state:RootState)=> state.blogs);
    const user = useSelector((state:RootState) => state.auth.user?.id)
    const  dispatch = useDispatch<AppDispatch>()

    useEffect(()=>{
        dispatch(fetchBlog({page,pageSize}))
    },[dispatch,page,pageSize])

    const handlePageChange=(_e:any,page:number)=>{
        dispatch(setPage(page))
    }

    if(loading) return <h1 className="text-center text-lg md:text-xl p-4 ">Searching for blogs</h1>
    
    return(
        <div className="container mx-auto px-4 py-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-6"> 
                {blogs.map(blog =>(
                    <BlogCard
                    key={blog.id}
                    blog={blog}
                    currentId = {user}
                    onDelete={id=> dispatch(deleteBlog(id))}
                    />
                ))}
            </div>
                       <div className="flex justify-center mt-2">
            <Pagination count={total} page={page} onChange={handlePageChange}
             
            />
            </div>
        </div>
    )
}
