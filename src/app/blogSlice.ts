//https://www.youtube.com/watch?v=8zPyXAWS0L4&list=PLC3y8-rFHvwheJHvseC3I0HuYI2f46oAK&index=11

import { createSlice } from "@reduxjs/toolkit";

import { createBlog, deleteBlog,fetchBlog } from "./blogThunks";


export interface Blog{
    user_id:string,
    id:string,
    title:string,
    content:string,
    created_at:string,
}

interface BlogState{
    blogs:Blog[],
    loading:boolean
}

const initialState:BlogState = {
    blogs:[],
    loading:false
}

const blogSlice= createSlice({
    name:'blogs',
    initialState,
    reducers:{},
    extraReducers: builder =>{
        builder.addCase(fetchBlog.pending, state =>{
            state.loading = true;
        })  
        builder.addCase(fetchBlog.fulfilled, (state,action)=>{
            state.loading= false;
            state.blogs = action.payload
        })
        builder.addCase(fetchBlog.rejected,state =>{
            state.loading= false;
        }) 
        
         builder.addCase(createBlog.pending,state =>{
            state.loading = true;
        })
        builder.addCase(createBlog.fulfilled, (state,action) =>{
            state.loading = false;  
            state.blogs.push(action.payload)
        })
        builder.addCase(createBlog.rejected,state  =>{
            state.loading= false;
        })
        builder.addCase(deleteBlog.pending,state =>{
            state.loading = true;
        })
        builder.addCase(deleteBlog.fulfilled, (state,action) =>{
            state.loading = false;
            state.blogs = state.blogs.filter(b => b.id !== action.payload); 
        })
    }
})


export default blogSlice.reducer