import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
  history: [],
};

export const fetchHistory = createAsyncThunk(
  "history/fetchHistory",
  async () => {
    const { data } = await axios.get("http://localhost:3030/history", {
      params: {
        _id: JSON.parse(sessionStorage.getItem("_id")),
      },
    });
    return data;
  }
);

export const newHistory = createAsyncThunk(
  "history/newHistory",
  async (info) => {
    const { data } = await axios.post("http://localhost:3030/sethistory/api", {
      params: {
        userId: JSON.parse(sessionStorage.getItem("_id")),
        date: new Date().toLocaleString([], {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }),
        ...info,
      },
    });

    return data;
  }
);

export const historySlice = createSlice({
  name: "history",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchHistory.fulfilled, (state, action) => {
      state.history = action.payload.reverse();
    });
    builder.addCase(newHistory.fulfilled, (state, action) => {
      state.history.unshift(action.payload);
    });
  },
});
