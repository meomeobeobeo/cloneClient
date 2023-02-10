import {configureStore} from '@reduxjs/toolkit'
import {projectSlice} from "./projectSlice"
import {backlogSlice} from "./backlogSlice"
import {doneSlice} from "./doneSlice"
import {inprogressSlice} from "./inprogressSlice"
import {selectedSlice} from "./selectedSlice"

const store = configureStore({

    reducer: {
        project: projectSlice.reducer,
        doneIssues: doneSlice.reducer,
        inprogressIssues: inprogressSlice.reducer,
        selectedIssues: selectedSlice.reducer,
        backlogIssues: backlogSlice.reducer
    }
})
export default store
