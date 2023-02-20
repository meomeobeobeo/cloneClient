import { createSlice } from "@reduxjs/toolkit";
import * as projectAction from "../action/projectAction";

export const projectSlice = createSlice({
  name: "project",
  initialState: {
    status: "idle",
    projectInfor: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(projectAction.getDetailProject.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(
      projectAction.getDetailProject.fulfilled,
      (state, action) => {
        state.status = "fulfilled";
        state.projectInfor = action.payload;
      }
    );
    builder.addCase(projectAction.getDetailProject.rejected, (state, action) => {
      state.status = "rejected";
    });
    builder.addCase(projectAction.addUserToProject.pending,(state, action) => {
      state.status = "pending";
    });
    builder.addCase(projectAction.addUserToProject.fulfilled,(state, action) => {
      state.status = "fulfilled";
      state.projectInfor = action.payload
    });
    builder.addCase(projectAction.addUserToProject.rejected,(state, action) => {
      state.status = "rejected";
    });
    builder.addCase(projectAction.createNewIssue.pending,(state, action) => {
      state.status = "pending";
    });
    builder.addCase(projectAction.createNewIssue.fulfilled,(state, action) => {
      state.status = "pending";
      state.projectInfor = action.payload?.updatedProject
    });
    builder.addCase(projectAction.createNewIssue.rejected,(state, action) => {
      state.status = "rejected";
    });
    builder.addCase(projectAction.updateProjectData.pending,(state, action) => {
      state.status = "pending";
    });
    builder.addCase(projectAction.updateProjectData.fulfilled,(state, action) => {
      state.status = "fulfilled";
      state.projectInfor = action.payload
    });
    builder.addCase(projectAction.updateProjectData.rejected,(state, action) => {
      state.status = "rejected";
    });

    

  },
});
