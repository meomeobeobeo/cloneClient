import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from '../../api/index'

export const signIn = createAsyncThunk('auth/signIn',async ({data , navigate }) => {
        // console.log(data);
        const result = await api.signIn(data) 
        navigate("/", { replace: true });
        // console.log(result.data)
        return result.data
    }
)
export const signUp = createAsyncThunk('auth/signUp',async (data) => {
    // console.log(data);
    const result = await api.signUp(data)
    // console.log(result);
    return result.data
})