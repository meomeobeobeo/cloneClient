import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from '../../api/index'

export const createComment = createAsyncThunk('comments/createComment',async({formData}) => {

    const {data} = await api.createComment({formData : formData})

    return data


})