import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
  articles: [],
};

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async () => {
    const { data } = await axios.get("http://localhost:3030/articles");
    return data;
  }
);
export const deleteArticle = createAsyncThunk(
  "articles/deleteArticle",
  async (_id) => {
    const { data } = await axios.post("http://localhost:3030/deletearticle", {
      params: {
        _id,
      },
    });
    return _id;
  }
);
export const addNewArticle = createAsyncThunk(
  "articles/addNewArticle",
  async (article) => {
    const { data } = await axios.post("http://localhost:3030/addnewarticle", {
      params: {
        article: {
          ...article,
          date: new Date().toLocaleString([], {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      },
    });
    return data;
  }
);

export const articlesSlice = createSlice({
  name: "articles",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addNewArticle.fulfilled, (state, action) => {
      state.articles.unshift(action.payload);
      console.log(action.payload);
    });
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.articles = action.payload.reverse();
    });
    builder.addCase(deleteArticle.fulfilled, (state, action) => {
      const index = state.articles.findIndex(
        (article) => article._id === action.payload
      );
      if (index >= 0) {
        state.articles.splice(index, 1);
      }
    });
  },
});
