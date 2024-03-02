import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getToken, removeToken, setToken } from "../../utils";
import api, { formDataApi } from "../../services/api";
import { openMessage } from "./messageSlice";

export const signOut = createAsyncThunk("authentication/signOut", async () => {
  removeToken();
});

export const login = createAsyncThunk(
  "authentication/login",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.post("/user/login", { ...payload });
      setToken(response.data.accessToken);
      dispatch(openMessage(response.data.message, "success"));

      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      dispatch(
        openMessage(error.response.data.message || "invalid login", "error")
      );

      return rejectWithValue(error.response.data);
    }
  }
);

export const completeInformation = createAsyncThunk(
  "authentication/completeInformation ",
  async (payload, { rejectWithValue, dispatch }) => {
    const token = getToken();

    if (!token) {
      throw new Error("Token not found");
    }

    try {
      const response = await formDataApi.patch(
        "/user/complete-information",
        payload,
        { headers: { "x-auth-token": token } }
      );

      setToken(response.data.token);
      dispatch(openMessage(response.data.message, "success"));

      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      dispatch(
        openMessage(error.response.data.error || "missing information", "error")
      );
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
      const response = await api.get("/user/safeHouse", {
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
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.post("/user/register", { ...payload });
      setToken(response.data.accessToken);
      dispatch(openMessage(response.data.message, "success"));

      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      dispatch(
        openMessage(
          error.response.data.message || "error occur invalid registration",
          "error"
        )
      );

      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  "authentication/updateUserInfo",
  async (payload, { rejectWithValue, dispatch }) => {
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
      dispatch(openMessage(response.data.message, "success"));

      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      dispatch(
        openMessage(
          error.response.data.error || "Internal Server Error",
          "error"
        )
      );
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
    setSuccess: (state, action) => {
      state.success = action.payload;
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
        const { accessToken, user } = action.payload;
        state.token = accessToken;
        state.user = user;
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
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
      })

      .addCase(updateUserInfo.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.loading = false;
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
      })
      .addCase(completeInformation.rejected, (state, action) => {
        state.loading = false;
      }),
});

export const {
  setUser,
  clearUser,
  resetError,
  resetSuccess,
  setError,
  setSuccess,
} = authenticationSlice.actions;
export default authenticationSlice.reducer;
