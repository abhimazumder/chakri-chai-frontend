/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import CryptoJS from "crypto-js";

export const userAuthSlice = createSlice({
  name: "userAuth",
  initialState: {
    isAuthenticated: false,
    accessToken: null,
    user: null,
  },
  reducers: {
    setUserLogin: (state, action) => {
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
      state.user = CryptoJS.AES.decrypt(
        action.payload.user,
        import.meta.env.VITE_CRYPTO_SECRET_KEY
      ).toString(CryptoJS.enc.Utf8);
    },
    setUserLogout: (state, action) => {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.user = null;
    },
  },
});

export const { setUserLogin } = userAuthSlice.actions;
export default userAuthSlice.reducer;
