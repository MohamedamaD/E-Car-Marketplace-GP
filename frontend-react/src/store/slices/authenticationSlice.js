import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getToken, removeToken, setToken } from "../../utils";
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
export const completeInformation = createAsyncThunk(
  "authentication/completeInformation ",
  async (payload, { rejectWithValue }) => {
    const token = getToken();

    if (!token) {
      throw new Error("Token not found");
    }

    try {
      const response = await api.put(
        "/user/complete-information",
        {
          ...payload,
        },
        { headers: { "x-auth-token": token } }
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
export const safeHouse = createAsyncThunk(
  "authentication/safeHouse ",
  async (_, { rejectWithValue }) => {
    const token = getToken();

    if (!token) {
      throw new Error("Token not found");
    }

    try {
      const response = await api.get("/user/safehouse", {
        headers: { "x-auth-token": token },
      });
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

export const updateUserInfo = createAsyncThunk(
  "authentication/updateUserInfo",
  async (payload, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token not found");
    }

    try {
      const response = await api.put(
        "/user/profile",
        { ...payload },
        { headers: { "x-auth-token": token } }
      );
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
  success: "",
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
    setError: (state, action) => {
      console.log(action);
      state.error = action.payload;
    },
    resetSuccess: (state) => {
      state.success = null;
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
        const { accessToken, user, message } = action.payload;
        state.token = accessToken;
        state.user = user;
        state.loading = false;
        state.isAuthenticated = true;
        state.success = message;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || action.error.message || "invalid login";
      })
      .addCase(register.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        const { accessToken, user, message } = action.payload;
        state.token = accessToken;
        state.user = user;
        state.success = message;
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "error occur invalid registration";
      })

      .addCase(updateUserInfo.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          action.error.message ||
          "Internal Server Error";
      })
      .addCase(safeHouse.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(safeHouse.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(safeHouse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.isAuthenticated = false;
        console.log(action);
      })

      .addCase(completeInformation.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(completeInformation.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.success = action.payload.message;
      })
      .addCase(completeInformation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.error.message;
      }),
});

export const { setUser, clearUser, resetError, resetSuccess, setError } =
  authenticationSlice.actions;
export default authenticationSlice.reducer;
