import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../authSlice";
import fetchReducer from "../fetchSlice";
import sideBarReducer from "../sideBarSlice";
import crudReducer from "../crudSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    fetch: fetchReducer,
    crud: crudReducer,
    sidebar: sideBarReducer,
  },
});
