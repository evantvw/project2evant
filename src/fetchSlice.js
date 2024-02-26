import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  product: {
    pending: false,
    products: [],
  },
  category: {
    pending: false,
    categories: [],
  },
  user: {
    pending: false,
    users: [],
  },
};

export const fetchData = createAsyncThunk(
  "fetch/fetchSummaryData",
  async (param = "") => {
    const { filter, sort } = param;
    try {
      const [productsRes, categoriesRes, usersRes] = await Promise.all([
        axios.get(
          `https://fakestoreapi.com/products${filter ? `/${filter}` : ""}${
            sort ? sort : ""
          }`
        ),
        axios.get("https://fakestoreapi.com/products/categories"),
        axios.get(
          `https://fakestoreapi.com/users${filter ? `/${filter}` : ""}${
            sort ? sort : ""
          }`
        ),
      ]);

      return {
        products: productsRes.data,
        categories: categoriesRes.data,
        users: usersRes.data,
      };
    } catch (e) {
      return e.message;
    }
  }
);

const fetchSlice = createSlice({
  name: "fetch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.product.pending = true;
        state.category.pending = true;
        state.user.pending = true;
        state.product.products = [];
        state.category.categories = [];
        state.user.users = [];
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.product.pending = false;
        state.product.products = [...action.payload.products];
        state.category.pending = false;
        state.category.categories = [...action.payload.categories];
        state.user.pending = false;
        state.user.users = [...action.payload.users];
      });
  },
});

export const getProducts = (state) => state.fetch.product.products;
export const getProductPending = (state) => state.fetch.product.pending;
export const getCategories = (state) => state.fetch.category.categories;
export const getCategoryPending = (state) => state.fetch.category.pending;
export const getUsers = (state) => state.fetch.user.users;
export const getUserPending = (state) => state.fetch.user.pending;
export default fetchSlice.reducer;
