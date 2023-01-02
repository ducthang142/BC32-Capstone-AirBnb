import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    increaseCount: (state, action) => {
      return { ...state, count: state.count + 1 };
    },
  },

  //   extraReducers: (builder) => {
  //     //Comment
  //     builder.addCase(postCmt.pending, (state, action) => {
  //       return { ...state, cmtLoading: true };
  //     });

  //     builder.addCase(postCmt.fulfilled, (state, action) => {
  //       return { ...state, cmtLoading: false, isCmt: state.isCmt + 1 };
  //     });

  //     builder.addCase(postCmt.rejected, (state, action) => {
  //       return { ...state, cmtLoading: false };
  //     });

  //     //Booking
  //     builder.addCase(booking.pending, (state, action) => {
  //       return { ...state, bookingLoading: true };
  //     });

  //     builder.addCase(booking.fulfilled, (state, action) => {
  //       return {
  //         ...state,
  //         bookingLoading: false,
  //         isBooked: true,
  //         count: state.count + 1,
  //       };
  //     });

  //     builder.addCase(booking.rejected, (state, action) => {
  //       return { ...state, bookingLoading: false };
  //     });
  //   },
});

export const { increaseCount } = homeSlice.actions;

export default homeSlice.reducer;
