import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import binhluanAPI from "../services/binhluanAPI";
import datphongAPI from "../services/datphongAPI";

const initialState = {
  cmtLoading: false,
  isCmt: 0,
  bookingLoading: false,
  isBooked: false,
  count: 0,
};

// comment action
export const postCmt = createAsyncThunk(
  "roomDetail/comment",
  async (values) => {
    try {
      await binhluanAPI.postBinhLuan(values);
    } catch (error) {
      throw error;
    }
  }
);

// booking action
export const booking = createAsyncThunk(
  "roomDetail/booking",
  async (values) => {
    try {
      await datphongAPI.postDatPhong(values);
    } catch (error) {
      throw error;
    }
  }
);

const roomDetailSlice = createSlice({
  name: "roomDetail",
  initialState,
  reducers: {
    resetIsBooked: (state, action) => {
      return { ...state, isBooked: false };
    },
  },

  extraReducers: (builder) => {
    //Comment
    builder.addCase(postCmt.pending, (state, action) => {
      return { ...state, cmtLoading: true };
    });

    builder.addCase(postCmt.fulfilled, (state, action) => {
      return { ...state, cmtLoading: false, isCmt: state.isCmt + 1 };
    });

    builder.addCase(postCmt.rejected, (state, action) => {
      return { ...state, cmtLoading: false };
    });

    //Booking
    builder.addCase(booking.pending, (state, action) => {
      return { ...state, bookingLoading: true };
    });

    builder.addCase(booking.fulfilled, (state, action) => {
      return {
        ...state,
        bookingLoading: false,
        isBooked: true,
        count: state.count + 1,
      };
    });

    builder.addCase(booking.rejected, (state, action) => {
      return { ...state, bookingLoading: false };
    });
  },
});

export const { resetIsBooked } = roomDetailSlice.actions;

export default roomDetailSlice.reducer;
