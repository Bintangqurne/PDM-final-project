import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../config/instance";
import { typeDataHistory, ProductData, HistoryById } from "./type";

// Tipe untuk state
interface AppState {
  history: typeDataHistory[];  // Seharusnya array of typeDataHistory
  product: ProductData | null;     // Produk bisa null atau objek Product
  historyById: HistoryById | null;  // Menggunakan null jika tidak ada histori yang dipilih
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

// Thunk untuk mengambil data history
export const fetchHistory = createAsyncThunk(
  'app/fetchHistory',
  async (_, thunkAPI) => {
    try {
      const response = await axios({
        url: '/customer/history',
        method: 'get',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      });
      return response.data;  // Pastikan ini adalah array
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
      console.log(response.data, 'ini di appslice');
      
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
        url: `/product/${id}`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      });
      return response.data;  // Produk tunggal (bukan array)
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Error fetching product by ID');
    }
  }
);

// Thunk untuk mengambil history berdasarkan ID
export const fetchHistoryById = createAsyncThunk(
  'app/fetchHistoryById',
  async (id: number, thunkAPI) => {
    try {
      const response = await axios({
        url: `/customer/history/${id}`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      return response.data;  // History berdasarkan ID
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Error Fetching History By Id');
    }
  }
)

const appSlice = createSlice({
  name: 'app',
  initialState: {
    history: {data:[]},  // Inisialisasi history sebagai array kosong
    historyById: null,  // History berdasarkan ID, bisa null
    product: [] as ProductData[],  // Produk sebagai array kosong
    status: 'idle',
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch history
    builder
      .addCase(fetchHistory.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.history = action.payload;  // Memperbarui dengan data history
      })
      .addCase(fetchHistory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });

    // Fetch product
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.product = action.payload;  // Memperbarui dengan array produk
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });

    // Fetch product by ID
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.product = [action.payload];  // Produk tunggal dimasukkan dalam array
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });

    // Fetch history by ID
    builder
      .addCase(fetchHistoryById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchHistoryById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.historyById = action.payload;  // History berdasarkan ID
      })
      .addCase(fetchHistoryById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  }
});


export default appSlice.reducer;
