import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  product: {
    data: {},
    pending: false,
  },
  user: {
    data: {},
    pending: false,
  },
};

export const fetchDetail = createAsyncThunk(
  "crud/fetchDetail",
  async ({ id }) => {
    try {
      const [productRes, userRes] = await Promise.all([
        axios.get(`https://fakestoreapi.com/products/${id}`),
        axios.get(`https://fakestoreapi.com/users/${id}`),
      ]);

      return {
        product: productRes.data,
        user: userRes.data,
      };
    } catch (e) {
      return e.message;
    }
  }
);

export const uploadProduct = createAsyncThunk(
  "crud/uploadProduct",
  async ({ formData }) => {
    try {
      const res = await axios.post(
        "https://fakestoreapi.com/products",
        formData
      );
      return res.data;
    } catch (e) {
      return e.message;
    }
  }
);

export const updateProduct = createAsyncThunk(
  "crud/updateProduct",
  async ({ id, formData }) => {
    try {
      const res = await axios.put(
        `https://fakestoreapi.com/products/${id}`,
        formData
      );
      return res.data;
    } catch (e) {
      return e.message;
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "crud/deleteProduct",
  async ({ id }) => {
    try {
      const res = await axios.delete(`https://fakestoreapi.com/products/${id}`);
      return res.data;
    } catch (e) {
      return e.message;
    }
  }
);

export const updateUser = createAsyncThunk(
  "crud/updateUser",
  async ({ id, formData }) => {
    try {
      const res = await axios.put(
        `https://fakestoreapi.com/users/${id}`,
        formData
      );
      return res.data;
    } catch (e) {
      return e.message;
    }
  }
);

export const deleteUser = createAsyncThunk(
  "crud/deleteUser",
  async ({ id }) => {
    try {
      const res = await axios.delete(`https://fakestoreapi.com/users/${id}`);
      return res.data;
    } catch (e) {
      return e.message;
    }
  }
);

const crudSlice = createSlice({
  name: "crud",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDetail.pending, (state) => {
        state.product.pending = true;
        state.user.pending = true;
        state.product.data = {};
        state.user.data = {};
      })
      .addCase(fetchDetail.fulfilled, (state, action) => {
        state.product.pending = false;
        state.user.pending = false;
        state.product.data = { ...action.payload.product };
        state.user.data = { ...action.payload.user };
      })
      .addCase(uploadProduct.fulfilled, (state, action) => {
        console.log("PRODUCT UPLOAD IS SUCCESSFUL => ", action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        console.log("PRODUCT UPDATE IS SUCCESSFUL => ", action.payload);
      })
      .addCase(deleteProduct.pending, (state) => {
        state.product.pending = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.product.pending = false;
        console.log("DELETE PRODUCT IS SUCCESSFUL => ", action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        console.log("USER UPDATE IS SUCCESSFUL => ", action.payload);
      })
      .addCase(deleteUser.pending, (state) => {
        state.user.pending = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.user.pending = false;
        console.log("DELETE USER IS SUCCESSFUL => ", action.payload);
      });
  },
});

export const getSingleProduct = (state) => state.crud.product.data;
export const getSingleUser = (state) => state.crud.user.data;
export const getSingleProductPending = (state) => state.crud.product.pending;
export const getSingleUserPending = (state) => state.crud.user.pending;
export default crudSlice.reducer;
