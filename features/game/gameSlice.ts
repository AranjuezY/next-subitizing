import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export interface RoundData {
  roundNumber: number;
  dotsCount: number;
  timeSpent: number;
  isCorrect: boolean;
}

export const session = createAsyncThunk(
  'game/session',
  async ({ playerId, rounds }: { playerId: number; rounds: RoundData[] }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/game/session', { playerId, rounds });
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
);
