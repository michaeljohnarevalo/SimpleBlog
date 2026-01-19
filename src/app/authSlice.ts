import { createSlice } from "@reduxjs/toolkit";
import type { User } from "@supabase/supabase-js"; //hinahanap ko pa pero baka mismong supabase na

interface AuthState{
    user : User | null;
}

const initialState:AuthState={
    user : null
}

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        login:(state,action) =>{
            state.user = action.payload; // payloadaction https://react-redux.js.org/tutorials/typescript-quick-start
        },
        logout:(state) => {
            state.user = null;
        }
    }
})

// https://www.youtube.com/watch?v=mMzhWXr9ass - for reducers login


export const {login,logout} = authSlice.actions;
export default authSlice.reducer