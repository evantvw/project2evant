import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  search: "",
};

const sideBarSlice = createSlice({
  name: "sideBar",
  initialState,
  reducers: {
    openSidebar: (state) => {
      state.open = true;
    },
    closeSideBar: (state) => {
      state.open = false;
    },
    setSearch: (state, action) => {
        state.search = action.payload
    }
  },
});

export const getOpen = (state) => state.sidebar.open;
export const getSearch = (state) => state.sidebar.search;
export const { openSidebar, closeSideBar, setSearch } = sideBarSlice.actions;
export default sideBarSlice.reducer;
