import {createSlice} from "@reduxjs/toolkit";
import * as auth from "../action/authAction"

export const authSlice = createSlice({
    name : 'auth',

    initialState:{
        status : "idle",
        authData :null
    },
    reducers:{
        logout : (state, action) =>{
            state.status = 'idle'
            state.authData = null
            localStorage.removeItem('auth')
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(auth.signUp.pending,(state , action)=>{
                state.status = 'pending';
            }) 
            .addCase(auth.signUp.fulfilled , (state, action)=>{
                state.status = 'fulfilled'
                console.log(action.payload)
               
            })
            .addCase(auth.signUp.rejected , (state, action)=>{
                state.status = 'rejected'
               
            })
            .addCase(auth.signIn.pending , (state, action)=>{
                state.status = 'pending';
            })
            .addCase(auth.signIn.fulfilled , (state, action)=>{
               
                // console.log(action.payload)
                localStorage.setItem('auth',JSON.stringify(action.payload))
                state.status = 'fulfilled'
                state.authData = action.payload
            })
            .addCase(auth.signIn.rejected , (state, action)=>{
                state.status = 'rejected'


            })

        

    }


})