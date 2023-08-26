/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import useRefresh from './useRefresh';
import { useSelector } from 'react-redux';
import { instance } from '../services/apis';


const useAxiosInstance = () => {
    const refresh = useRefresh();
    const accessToken = useSelector(state => state.userAuth.accessToken);
  
    useEffect(() => {  
      const requestIntercept = instance.interceptors.request.use(
        config => {
          if (!config.headers['Authorization'] && accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
          }
          return config;
        },
        error => Promise.reject(error)
      );
  
      const responseIntercept = instance.interceptors.response.use(
        response => response,
        async (error) => {
          const prevRequest = error?.config;
          if (error?.response?.status === 401 && !prevRequest?.sent) {
            prevRequest.sent = true;
            const newAccessToken = await refresh();
            prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return instance(prevRequest);
          }
          return Promise.reject(error);
        }
      );
  
      return () => {
        instance.interceptors.request.eject(requestIntercept);
        instance.interceptors.response.eject(responseIntercept);
      };
    }, [accessToken, refresh]);
  
    return instance;
  };  

export default useAxiosInstance;