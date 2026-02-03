import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice'
import blogReducer from './blogSlice'
import commentReducer from './CommentSlice'

export const store =configureStore({
    reducer:{
        auth:authReducer,
        blogs:blogReducer,
         comments:commentReducer,
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch