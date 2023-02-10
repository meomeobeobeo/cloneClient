import {createSlice} from "@reduxjs/toolkit";

export const selectedSlice = createSlice({
    name: "selectedData",
    initialState: {
        selectedData: []
    },
    reducers: {
        updateDataFromProject: (state, action) => {
            const data = action.payload.filter((issue, index) => {
                return issue.status === "selected";
            })


            state.selectedData = data


        },// return type 'selected/updateDataFromProject
        deleteIssue: (state, action) => {
            console.log(action.payload)
            state.selectedData = state.selectedData.filter((data) => {
                return data.id !== action.payload.id
            })
            console.log(state.backlogData)

        },
        addIssues: (state, action) => {
            state.selectedData.push(action.payload)
        },
        updateIssues: (state, action) => {
            state.selectedData = action.payload
        }
    },
    extraReducers: {}

})
