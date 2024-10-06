import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
  'auth/login',
  async (name, { rejectWithValue }) => {
    try {
      const response = await axios.post('api/auth/login', { name });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
)

interface AuthState {
  user: { id: string; name: string } | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  status: 'idle',
  error: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<{ token: string; user: { id: string; name: string } }>) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
      })
  }
})

export const { logout } = authSlice.actions;

export default authSlice.reducer;
