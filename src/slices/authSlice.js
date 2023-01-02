import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authAPI from "../services/authAPI";
import nguoidungAPI from "../services/nguoidungAPI";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
  isSignupFulfilled: false,
  signupError: null,
  updateError: null,
  isUpdateFulfilled: false,
  avatarError: null,
  isAvatarFulfilled: false,
};

// signin action
export const signin = createAsyncThunk("auth/signin", async (values) => {
  try {
    const data = await authAPI.signin(values);
    // Lưu thông tin user xuống localStorage
    localStorage.setItem("user", JSON.stringify(data));
    return data;
  } catch (error) {
    throw error;
  }
});

// signup action
export const signup = createAsyncThunk("auth/signup", async (values) => {
  try {
    await authAPI.signup(values);
  } catch (error) {
    throw error;
  }
});

// update avatar action
export const updateAvatar = createAsyncThunk("users/avatar", async (values) => {
  try {
    await nguoidungAPI.postDoiAvatar(values);
  } catch (error) {
    throw error;
  }
});

// update action
export const update = createAsyncThunk("users", async (values) => {
  try {
    await nguoidungAPI.putChinhSuaThongTin(values.id, values);
  } catch (error) {
    throw error;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      localStorage.removeItem("user");
      return { ...state, user: null };
    },

    resetIsSignup: (state, action) => {
      return { ...state, isSignupFulfilled: false };
    },

    resetIsUpdate: (state, action) => {
      return { ...state, isUpdateFulfilled: false };
    },

    resetIsAvatar: (state, action) => {
      return { ...state, isAvatarFulfilled: false };
    },
  },

  extraReducers: (builder) => {
    //Signin
    builder.addCase(signin.pending, (state, action) => {
      return { ...state, loading: true };
    });

    builder.addCase(signin.fulfilled, (state, action) => {
      return { ...state, loading: false, user: action.payload };
    });

    builder.addCase(signin.rejected, (state, action) => {
      return { ...state, loading: false, error: action.error.message };
    });

    //Sign up
    builder.addCase(signup.pending, (state, action) => {
      return { ...state, loading: true };
    });

    builder.addCase(signup.fulfilled, (state, action) => {
      return { ...state, loading: false, isSignupFulfilled: true };
    });

    builder.addCase(signup.rejected, (state, action) => {
      return { ...state, loading: false, signupError: action.error.message };
    });

    //Update
    builder.addCase(update.pending, (state, action) => {
      return { ...state, loading: true };
    });

    builder.addCase(update.fulfilled, (state, action) => {
      return { ...state, loading: false, isUpdateFulfilled: true };
    });

    builder.addCase(update.rejected, (state, action) => {
      return { ...state, loading: false, updateError: action.error.message };
    });

    //Update avatar
    builder.addCase(updateAvatar.pending, (state, action) => {
      return { ...state, loading: true };
    });

    builder.addCase(updateAvatar.fulfilled, (state, action) => {
      return { ...state, loading: false, isAvatarFulfilled: true };
    });

    builder.addCase(updateAvatar.rejected, (state, action) => {
      return { ...state, loading: false, avatarError: action.error.message };
    });
  },
});

export const { logout, resetIsSignup, resetIsUpdate, resetIsAvatar } = authSlice.actions;

export default authSlice.reducer;
