import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/authSlice";
import roomDetail from "./slices/roomDetailSlice";
import home from "./slices/homeSlice";

const store = configureStore({
  reducer: {
    auth,
    roomDetail,
    home,
  },
});

export default store;
