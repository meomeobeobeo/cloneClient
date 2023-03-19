import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from '../../api/index'

export const getListProjects = createAsyncThunk('/listProjects/getListProjects',async (currentUserId)=>{

    const {data} = await api.getListProjects(currentUserId)
 
    return data

})
export const getDetailProject = createAsyncThunk('/project/getDetailProject' , async (projectId)=>{
    const {data} = await api.getDetailProject(projectId)
 
    return data
})
export const addUserToProject = createAsyncThunk('/projects/addUserToProject',async (formData)=>{
    const {data} = await api.addUserToProject(formData)
   
    return data

})

export const createNewIssue = createAsyncThunk('/projects/createNewIssue',async ({projectId  , formData })=>{
    const {data} = await api.createNewIssue({projectId  , formData })
   
    return data
    
})

export const updateProjectData = createAsyncThunk('/projects/updateProject',async ({projectId , formData})=>{
    const {data} = await api.updateProjectData({projectId , formData})
    return data
})
export const deleteIssues = createAsyncThunk('/projects/deleteIssues',async ({issueId , project_id})=>{
    const {data} = await api.deleteIssues({issueId:issueId , project_id : project_id})
    return data
})
