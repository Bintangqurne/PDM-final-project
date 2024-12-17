import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../config/instance";
import { typeDataHistory, Product } from "./type";

interface AppState {
  history: typeDataHistory;
  product: Product; // Mengubah menjadi array Product
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

// Thunk untuk mengambil data history
export const fetchHistory = createAsyncThunk(
  'app/fetchHistory', 
  async (_, thunkAPI) => {
    try {
      const response = await axios({
        url: '/history',
        method: 'get',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Error fetching history');
    }
  }
);

// Thunk untuk mengambil semua produk
export const fetchProduct = createAsyncThunk(
  'app/fetchProduct',
  async (_, thunkAPI) => {
    try {
      const response = await axios({
        url: '/product',
        method: 'get',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      });
      return response.data;  // Pastikan data yang diterima adalah array produk
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Error fetching Product');
    }
  }
);

// Thunk untuk mengambil produk berdasarkan ID
export const fetchProductById = createAsyncThunk(
  'app/fetchProductById',
  async (id: number, thunkAPI) => {
    try {
      const response = await axios({
        url: `/product/${id}`,  // URL endpoint dengan parameter ID
        method: 'get',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`  // Menambahkan token untuk autentikasi
        }
      });
      return response.data;  // Data produk yang diterima akan disesuaikan dengan format produk
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Error fetching product by ID');
    }
  }
);

const appSlice = createSlice({
  name: 'app',
  initialState: {
    history: { data: [] },
    product: [],  // Inisialisasi dengan array kosong
    status: 'idle',
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistory.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.history = action.payload;
      })
      .addCase(fetchHistory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });

    builder
      .addCase(fetchProduct.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.product = action.payload;  // Memperbarui state.product dengan array produk
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });

    builder
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.product = action.payload;  // Membungkus data produk yang diterima dalam array
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  }
});

export default appSlice.reducer;
