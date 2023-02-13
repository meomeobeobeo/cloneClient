import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from '../../api/index'

export const getListProjects = createAsyncThunk('/listProjects/getListProjects',async (currentUserId)=>{

    const {data} = await api.getListProjects(currentUserId)
    console.log(data)
    return data

})
export const getDetailProject = createAsyncThunk('/project/getDetailProject' , async (projectId)=>{
    const {data} = await api.getDetailProject(projectId)
    console.log(data)
    return data
})