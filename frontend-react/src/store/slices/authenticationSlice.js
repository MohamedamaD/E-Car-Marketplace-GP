import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { removeToken, setToken } from "../../utils";
import api from "../../services/api";

export const signOut = createAsyncThunk("authentication/signOut", async () => {
  removeToken();
});

export const login = createAsyncThunk(
  "authentication/login",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/login", { ...payload });
      setToken(response.data.accessToken);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "authentication/register",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/register", { ...payload });
      setToken(response.data.accessToken);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  user: null,
  isAuthenticated: false,
  token: null,
  loading: false,
  error: "",
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(signOut.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {};
        state.isAuthenticated = false;
        state.token = null;
      })
      .addCase(login.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { accessToken, user } = action.payload;
        state.token = accessToken;
        state.user = user;
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "invalid login";
      })
      .addCase(register.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        const { accessToken, user } = action.payload;
        state.token = accessToken;
        state.user = user;
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "error occur invalid registration";
      }),
});

export const { setUser, clearUser, resetError } = authenticationSlice.actions;
export default authenticationSlice.reducer;
