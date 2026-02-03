
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import  {supabase} from './supabase'

export const addComments = createAsyncThunk(
    'comments/addcomment', async(comment:{
        content:string,
        user_id:string,
        post_id:string,
        image?:string|null
        user_email:string | null
    })=>{
         const { data, error } = await supabase
          .from('comments')
          .insert({
            content:comment.content,
            post_id:comment.post_id,
            user_id:comment.user_id,
            image:comment.image ?? null,
            username:comment.user_email
          })
          .select()
          .single()
        
          if(error){
            console.error("SUPABASE ERROR:", error)
            throw error
          }
            return data
            } 
)


export const uploadImage = createAsyncThunk<string,{file:File;blogId?:string},{state:RootState}>(
    'blogs/upload', async({file, blogId}, {getState})=>{
        const userId = getState().auth.user?.id
        const folderPath = blogId ? `${userId}/blogs/${blogId}` : `${userId}/temp`;
        const filename =` ${file.name}-${Date.now()}`
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


export const fetchComments = createAsyncThunk(
  'comments/fetchcomment', async(post_id:string)=>{
    const { data, error } = await supabase
        .from("comments")
    .select("*")
    .eq("post_id", post_id)
    .order("created_at", { ascending: true });
    if(error){
        throw error
    } return data
  }
)