import {createSlice} from "@reduxjs/toolkit";

export const inprogressSlice = createSlice({
    name: "inprogressData",
    initialState: {
        inprogressData: []
    },
    reducers: {
        updateDataFromProject: (state, action) => {
            const data = action.payload.filter((issue, index) => {
                return issue.status === "inprogress";
            })


            state.inprogressData = data


        },// return type 'inprogress/updateDataFromProject
        deleteIssue: (state, action) => {
            console.log(action.payload)
            state.inprogressData = state.inprogressData.filter((data) => {
                return data.id !== action.payload.id
            })


        },
        addIssue: (state, action) => {
            state.backlogData.push(action.payload)
        },
        updateIssues: (state, action) => {
            state.inprogressData = action.payload
        }
    },
    extraReducers: {}

})
