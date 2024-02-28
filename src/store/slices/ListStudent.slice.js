import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getStudents = createAsyncThunk("students/getStudents", async () => {
  try {
    const response = await axios.get("http://localhost:3000/students");
    return response.data;
  } catch (error) {
    console.log("Error", error);
  }
});

const studentSlice = createSlice({
  name: "students",
  initialState: {
    students: [],
  },
  reducers: {
    setStudents: (state, action) => {
      state.students = action.payload;
    },
    addStudent: (state, action) => {
      state.students.push(action.payload);
    },
    removeStudent: (state, action) => {
      state.students = state.students.filter(
        (student) => student.id !== action.payload
      );
    },
    updateStudent: (state, action) => {
      const index = state.students.findIndex(
        (student) => student.id === action.payload.id
      );
      state.students[index] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getStudents.fulfilled, (state, action) => {
      state.students = action.payload;
    });
  },
});

export const studentActions = {
  ...studentSlice.actions,
  getStudents,
};

export const studentReducer = studentSlice.reducer;
