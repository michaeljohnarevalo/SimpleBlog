
import { createAsyncThunk } from "@reduxjs/toolkit";
import  {supabase} from './supabase'
import   { type Blog} from './blogSlice'




export const fetchBlog = createAsyncThunk<Blog[]>( 
    'blogs/fetch', async()=>{
    const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false })
    if (error){
        throw error
        
    } return data as Blog[];
       
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