import {createSlice} from "@reduxjs/toolkit";

export const doneSlice = createSlice({
    name: "doneData",
    initialState: {
        doneData: []
    },
    reducers: {
        updateDataFromProject: (state, action) => {
            const data = action.payload.filter((issue, index) => {
                return issue.status === "done";
            })


            state.doneData = data


        },// return type 'done/updateDataFromProject
        deleteIssue: (state, action) => {
            console.log(action.payload)
            state.doneData = state.doneData.filter((data) => {
                return data.id !== action.payload.id
            })


        },
        addIssue: (state, action) => {
            state.backlogData.push(action.payload)
        },
        updateIssues: (state, action) => {
            state.doneData = action.payload
        }
    },
    extraReducers: {}

})
