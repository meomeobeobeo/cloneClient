import {configureStore} from '@reduxjs/toolkit'
import {projectSlice} from "./projectSlice"
import {backlogSlice} from "./backlogSlice"
import {doneSlice} from "./doneSlice"
import {inprogressSlice} from "./inprogressSlice"
import {selectedSlice} from "./selectedSlice"
import {authSlice} from './authSlice'
import { listProjectsSlice } from './listProjectsSlice'
const store = configureStore({

    reducer: {
        project: projectSlice.reducer,
        doneIssues: doneSlice.reducer,
        inprogressIssues: inprogressSlice.reducer,
        selectedIssues: selectedSlice.reducer,
        backlogIssues: backlogSlice.reducer,
        auth : authSlice.reducer,
        listProjects : listProjectsSlice.reducer
    }
})
export default store
