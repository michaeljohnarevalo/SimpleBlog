
import { createSlice } from "@reduxjs/toolkit";

import { createBlog, deleteBlog,editBlog,fetchBlog } from "./blogThunks";


export interface Blog{
    user_id:string,
    id:string,
    title:string,
    content:string,
    created_at:string,
}

interface BlogState{
    blogs:Blog[],
    loading:boolean,
        total:number,
    page:number,
    pageSize:number,
    
}

const initialState:BlogState = {
    blogs:[],
    loading:false,
        total:0,
    page:1,
    pageSize:10,
}

const blogSlice= createSlice({
    name:'blogs',
    initialState,
    reducers:{          setPage:(state,action)=>{
            state.page=action.payload
            state.loading=true
        }},
    extraReducers: builder =>{
        builder.addCase(fetchBlog.pending, state =>{
            state.loading = true;
        })   
        builder.addCase(fetchBlog.fulfilled, (state,action)=>{
            state.loading= false;
            state.blogs = action.payload.data
            state.total = action.payload.total

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

        
        builder.addCase(editBlog.pending,state =>{
            state.loading = true;
        })

         builder.addCase(editBlog.fulfilled,(state,action)=>{
            state.loading = false;
            const {id, title,content} = action.payload
            const existBlog = state.blogs.find(b  =>  b.id === id)
            if(existBlog){
                existBlog.title = title
                existBlog.content = content
            }
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

export const {setPage} = blogSlice.actions;
export default blogSlice.reducer