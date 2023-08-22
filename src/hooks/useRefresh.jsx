/* eslint-disable no-unused-vars */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setRefreshToken } from '../services/userAuthSlice';
import { refreshInstance } from '../services/apis';

const useRefresh = () => {
  const dispatch = useDispatch();
  const refreshToken = useSelector(state => state.userAuth.refreshToken);

    const refresh = async () => {
      const response = await refreshInstance.post("/auth/refresh", {REFRESH_TOKEN: refreshToken});
      dispatch(setRefreshToken({accessToken: response.data.ACCESS_TOKEN, refreshToken: response.data.REFRESH_TOKEN}));
      return response.data.ACCESS_TOKEN;
    }
  return refresh;
}

export default useRefresh;