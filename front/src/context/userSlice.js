import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  error: null,
  errorMessage: null,
  isLogged: false,
  user: {},
  isLoading: false,
};

export const checkLogged = createAsyncThunk(
  "user/checkLogged",
  async (user) => {
    const { data } = await axios.post("http://localhost:3030/findUser", {
      params: {
        _id: JSON.parse(sessionStorage.getItem("_id")),
      },
    });
    return data;
  }
);

export const signUpUser = createAsyncThunk("user/signUpUser", async (user) => {
  const { data } = await axios.post("http://localhost:3030/register", {
    params: {
      email: user.email.toLowerCase(),
      password: user.password,
      name: user.nickName,
    },
  });
  return data;
});

export const fetchUser = createAsyncThunk("user/fetchUser", async (user) => {
  const { data } = await axios.post("http://localhost:3030/login", {
    params: {
      email: user.email.toLowerCase(),
      password: user.password,
    },
  });
  return data;
});

export const addToWatchList = createAsyncThunk(
  "user/addToWatchList",
  async (coin) => {
    const { data } = await axios.get("http://localhost:3030/watchlist/api", {
      params: {
        addToWatchList: coin,
        _id: JSON.parse(sessionStorage.getItem("_id")),
      },
    });
    return data;
  }
);
export const removeFromList = createAsyncThunk(
  "user/removeFromList",
  async (coin) => {
    const { data } = await axios.get(
      "http://localhost:3030/watchlistremove/api",
      {
        params: {
          removeFromList: coin,
          _id: JSON.parse(sessionStorage.getItem("_id")),
        },
      }
    );
    return data;
  }
);
export const buyCoin = createAsyncThunk("user/buyCoin", async (coin) => {
  const { data } = await axios.post("http://localhost:3030/buycoin/api", {
    params: {
      ...coin,
      _id: JSON.parse(sessionStorage.getItem("_id")),
    },
  });
  return data;
});
export const sellCoin = createAsyncThunk("user/sellCoin", async (coin) => {
  const { data } = await axios.post("http://localhost:3030/sellcoin/api", {
    params: {
      ...coin,
      _id: JSON.parse(sessionStorage.getItem("_id")),
    },
  });
  return data;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    //checkIfLogin
    builder.addCase(checkLogged.pending, (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addCase(checkLogged.fulfilled, (state, action) => {
      if (action.payload.status == 200) {
        state.user = action.payload.user;
        state.error = null;
        state.errorMessage = null;
        state.isLogged = true;
        state.isLoading = false;
      }
      return;
    });
    //register
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      switch (action.payload.status) {
        case "200":
          sessionStorage.setItem(
            "_id",
            JSON.stringify(action.payload.user._id)
          );
          state.user = [action.payload.user];
          state.error = null;
          state.errorMessage = null;
          state.isLogged = true;
          break;
        case "401":
          state.error = true;
          state.errorMessage = "Email already exists";
          break;
        case "400":
          state.error = true;
          state.errorMessage = "Missing inputs";
          break;
        case "404":
          state.error = true;
          state.errorMessage = "Invalid email";
          break;
        default:
          state.error = true;
          state.errorMessage = "Unknown error occurred";
          break;
      }
    });
    //login
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      switch (action.payload.status) {
        case "200":
          sessionStorage.setItem(
            "_id",
            JSON.stringify(action.payload.user[0]._id)
          );
          state.user = action.payload.user;
          state.error = null;
          state.errorMessage = null;
          state.isLogged = true;
          break;
        case "404":
          state.error = true;
          state.errorMessage = "User Not Found";
          break;
        case "401":
          state.error = true;
          state.errorMessage = "Invalid credentials";
          break;
        case "400":
          state.error = true;
          state.errorMessage = "Missing inputs";
          break;
        default:
          state.error = true;
          state.errorMessage = "Unknown error occurred";
          break;
      }
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.errorMessage = action.error.message;
    });
    //watchlist
    builder.addCase(addToWatchList.fulfilled, (state, action) => {
      state.user[0] = action.payload;
    });
    builder.addCase(removeFromList.fulfilled, (state, action) => {
      state.user[0] = action.payload;
    });
    //Buy//Sell
    builder.addCase(buyCoin.fulfilled, (state, action) => {
      state.user[0] = action.payload;
    });
    builder.addCase(sellCoin.fulfilled, (state, action) => {
      state.user[0] = action.payload;
    });
  },
  reducers: {
    logout: (state, action) => {
      state.isLogged = false;
      state.user = {};
      localStorage.setItem("value", "0");
      sessionStorage.removeItem("_id");
    },
  },
});

export const { logout } = userSlice.actions;
