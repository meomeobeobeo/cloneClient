import {createSlice} from "@reduxjs/toolkit"
import * as projectAction from "../action/projectAction"
export const listProjectsSlice = createSlice({

    name :'listProjects',
    initialState:{
        status :'idle',
        listInfor:[]
    },
    reducers:{
        addProjectIdToListProject :(state , action)=>{
            state.listInfor.push(action.payload);
        }

    },
    extraReducers:(builder)=>{
        builder.addCase(projectAction.getListProjects.pending,(state, action)=>{
            state.status = 'pending'
        })
        builder.addCase(projectAction.getListProjects.fulfilled,(state, action)=>{
            state.status = 'fulfilled'
            state.listInfor = action.payload
        })
        builder.addCase(projectAction.getListProjects.rejected,(state, action)=>{
            state.status = 'rejected'
        })


    }


    
})