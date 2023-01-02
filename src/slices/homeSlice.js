import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import vitriAPI from "../services/vitriAPI";

const initialState = {
  danhSachViTri: null,
  danhSachViTriPhanTrang: null,
  loading: false,
  count: 0,
};

// Lấy danh sách vị trí
export const listVitri = createAsyncThunk("home/vitri", async () => {
  try {
    const data = await vitriAPI.getViTri();
    return data;
  } catch (error) {
    throw error;
  }
});

//Lấy danh sách vị trí phân trang cho showing
export const listViTriPhanTrang = createAsyncThunk("home/vitriphantrang", async () => {
  try {
    const data = await vitriAPI.getViTriPhanTrang();
    return data;
  } catch (error) {
    throw error;
  }
});

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    increaseCount: (state, action) => {
      return { ...state, count: state.count + 1 };
    },
  },

  extraReducers: (builder) => {
    //Lấy danh sách vị trí
    builder.addCase(listVitri.pending, (state, action) => {
      return { ...state, loading: true };
    });

    builder.addCase(listVitri.fulfilled, (state, action) => {
      return { ...state, loading: false, danhSachViTri: action.payload};
    });

    builder.addCase(listVitri.rejected, (state, action) => {
      return { ...state, loading: false };
    });

    //Lấy danh sách vị trí phân trang cho showing
    builder.addCase(listViTriPhanTrang.pending, (state, action) => {
      return { ...state, loading: true };
    });

    builder.addCase(listViTriPhanTrang.fulfilled, (state, action) => {
      return { ...state, loading: false, danhSachViTriPhanTrang: action.payload};
    });

    builder.addCase(listViTriPhanTrang.rejected, (state, action) => {
      return { ...state, loading: false };
    });
  },
});

export const { increaseCount } = homeSlice.actions;

export default homeSlice.reducer;
