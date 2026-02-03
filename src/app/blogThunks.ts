
import { createAsyncThunk } from "@reduxjs/toolkit";
import  {supabase} from './supabase'
import   { type Blog} from './blogSlice'
import type { RootState } from "./store";




export const fetchBlog = createAsyncThunk<{data:Blog[], total:number},{page:number,pageSize:number}>( 
    'blogs/fetch', async({page,pageSize})=>{
        const from = (page -  1) * pageSize;
    const to = page * pageSize - 1;  
    const { data, error,count } = await supabase
    .from('blogs')
    .select('*',{count:'exact'} )
    .range(from,to)
    .order('created_at', { ascending: false })
    if (error){
        throw error
        
    } return {
        data:data,
        total:count ? Math.ceil(count/pageSize) : 0,
    };
       
    }
)

export const createBlog = createAsyncThunk(
    'blogs/create', async(blog:any)=>{
    const { data, error } = await supabase
  .from('blogs')
  .insert(blog)
  .select()
  .single()

  if(error)
    throw error
    return data
    } 
)

export const editBlog = createAsyncThunk(
    'blogs/edit', async({id,title,content}:{id:string,title:string,content:string})=>{
    const { error } = await supabase
    .from('blogs')
    .update({ title,content})
    .eq('id', id)
    if(error)
        throw error
        return {id,title,content}
    }
)



export const deleteBlog = createAsyncThunk( 
    'blogs/delete', async(id:string)=>{
    const { error } = await supabase
    .from('blogs')
    .delete()
    .eq('id', id)
    if(error)
        throw error
    return id
    }
)


export const  fetchBlogId = createAsyncThunk<Blog, string>(
    'blogs/fetchblogid', async(id) =>{
        const {data, error} = await supabase
        .from('blogs')
        .select('*')
        .eq('id',id)
        .single()
        if(error){
            throw error
        } return data
    }
) 

export const uploadImage = createAsyncThunk<string,{file:File;blogId?:string},{state:RootState}>(
    'blogs/upload', async({file, blogId}, {getState})=>{
        const userId = getState().auth.user?.id
        const folderPath = blogId ? `${userId}/blogs/${blogId}` : `${userId}/temp`;
        const filename = `${file.name}-${Date.now()}`
        const filePath = `${folderPath}/${filename}`; 
        const {error} = await supabase
        .storage
        .from('images')
        .upload(filePath,file) 

        if(error){
            throw error
        }

        const {data} = supabase
        .storage
        .from('images')
        .getPublicUrl(filePath)
        return data.publicUrl
    }
)