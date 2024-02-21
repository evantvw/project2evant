import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  token: localStorage.getItem("token") || "",
  isError: false,
  username: "",
  password: "",
};

export const fetchToken = createAsyncThunk(
  "authenticate/fetchToken",
  async (user) => {
    try {
      const res = await axios.post("https://fakestoreapi.com/auth/login", user);
      return res.data;
    } catch (e) {
      return e.message;
    }
  }
);

export const fetchUserData = createAsyncThunk(
  "authenticate/fetchUserData",
  async () => {
    try {
      const res = await axios.get("https://fakestoreapi.com/users");
      return res.data;
    } catch (e) {
      return e.message;
    }
  }
);

export const authSlice = createSlice({
  name: "authenticate",
  initialState,
  reducers: {
    userInfo: (state, action) => {
      const { username, password } = action.payload;
      state.username = username;
      state.password = password;
    },
    loginFailure: (state) => {
      state.isError = true;
    },
    logout: (state) => {
      state.token = "";
      localStorage.removeItem("token");
      localStorage.removeItem("userID");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchToken.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload);
        state.token = action.payload;
        state.isError = false;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        const users = action.payload;
        for (let i = 0; i < users.length; i++) {
          if (users[i].username === state.username) {
            localStorage.setItem("userID", users[i].id);
          }
        }
      });
  },
});

export const getToken = (state) => state.auth.token;
export const getIsError = (state) => state.auth.isError;
export const { userInfo, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
