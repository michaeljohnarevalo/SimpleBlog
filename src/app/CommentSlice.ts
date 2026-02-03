import { createSlice } from "@reduxjs/toolkit";
import { addComments, fetchComments } from "./commentThunks";


export interface Comment{
    id:string,
    created_at:string,
    post_id:string,
    content:string,
    user_id:string,
    username:string,
    image?:string | null
}

interface  CommentsState{
    comments: Comment[],
    loading:boolean,
     imageUrl: string | null,
}


const initialState:CommentsState={
    comments:[],
    loading:false,
    imageUrl:null,
}


const commentSlice= createSlice({
    name:'comments',
    initialState,
    reducers:{
    },
    extraReducers: builder =>{
            builder.addCase(addComments.pending, (state)=>{
                state.loading = true
            })
                builder.addCase(addComments.fulfilled, (state, action)=>{
                    state.loading =false;
                    state.comments.push(action.payload)
                })
            builder.addCase(fetchComments.pending,(state)=>{
                state.loading = true
            })
            builder.addCase(fetchComments.fulfilled,(state,action)=>{
                state.loading = false;
                state.comments = action.payload
            })
    }
})


export default commentSlice.reducer