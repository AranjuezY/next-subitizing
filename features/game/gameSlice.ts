import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
    } catch (err: any) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      } else {
        return rejectWithValue('An unexpected error occurred.');
      }
    }
  }
);
