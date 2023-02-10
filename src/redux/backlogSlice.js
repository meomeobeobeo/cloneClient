import {createSlice} from "@reduxjs/toolkit";

export const backlogSlice = createSlice({
    name: "backlogData",
    initialState: {
        backlogData: []
    },
    reducers: {
        updateDataFromProject: (state, action) => {
            const data = action.payload.filter((issue, index) => {
                return issue.status === "backlog";
            })

            state.backlogData = data


        },// return type 'backlog/updateDataFromProject
        deleteIssue: (state, action) => {
            console.log(action.payload)
            state.backlogData = state.backlogData.filter((data) => {
                return data.id !== action.payload.id
            })


        },
        addIssue: (state, action) => {
            state.backlogData.push(action.payload)
        },
        updateIssues: (state, action) => {
            
            state.backlogData = action.payload
        }


    },
    extraReducers: {}

})
