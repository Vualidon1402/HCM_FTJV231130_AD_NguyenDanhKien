import { configureStore } from "@reduxjs/toolkit";
import { studentReducer } from "./slices/ListStudent.slice";

const Store = configureStore({
  reducer: {
    students: studentReducer,
  },
});

export default Store;
