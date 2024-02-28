import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const findAll = createAsyncThunk("users/findAll", async () => {
  let res = await axios.get(`http://localhost:3000/students`);
  return res.data;
});

const studentSlice = createSlice({
  name: "students",
  initialState: {
    data: [],
  },
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(findAll.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const studentReducer = studentSlice.reducer;
export const studentActions = { ...studentSlice.actions, findAll };
