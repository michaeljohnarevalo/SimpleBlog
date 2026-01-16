import { createSlice } from "@reduxjs/toolkit";
import type { User } from "@supabase/supabase-js"; 

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
            state.user = action.payload; 
        },
        logout:(state) => {
            state.user = null;
        }
    }
})



export const {login,logout} = authSlice.actions;
export default authSlice.reducer