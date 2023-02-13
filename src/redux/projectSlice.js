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
  },
});
