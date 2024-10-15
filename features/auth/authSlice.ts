import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export const signin = createAsyncThunk(
  'auth/signin',
  async ({ name }: { name: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('api/auth/signin', { name });
      return response.data;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue('An unexpected error occurred.');
      }
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
      .addCase(signin.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
      })
      .addCase(signin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  }
})

export const { logout } = authSlice.actions;

export default authSlice.reducer;
