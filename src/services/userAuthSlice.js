/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import CryptoJS from "crypto-js";

export const userAuthSlice = createSlice({
  name: "userAuth",
  initialState: {
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
    user: null,
  },
  reducers: {
    setUserLogin: (state, action) => {
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      const user = {};
      Object.entries(action.payload.user).forEach(([key, value]) => {
        user[key] = CryptoJS.AES.decrypt(
          value,
          import.meta.env.VITE_CRYPTO_SECRET_KEY
        ).toString(CryptoJS.enc.Utf8);
      })
      state.user = user;
    },
    setUserLogout: (state, action) => {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
    },
    setRefreshToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    }
  },
});

export const { setUserLogin, setUserLogout, setRefreshToken } = userAuthSlice.actions;
export default userAuthSlice.reducer;
