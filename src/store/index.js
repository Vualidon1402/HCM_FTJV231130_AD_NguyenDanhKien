import { configureStore } from "@reduxjs/toolkit";
import { studentReducer, studentActions } from "./slices/ListStudent.slice";
export const store = configureStore({
  reducer: {
    studentReducer: studentReducer,
  },
});

store.dispatch(studentActions.findAll());
