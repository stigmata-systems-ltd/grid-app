import axios from 'axios';
import {AsyncStorage} from 'react-native';
import * as Constants from '../constants/APIConstants';

export const isUserLoggedIn = async () => {
  if (await AsyncStorage.getItem('refreshToken') !== null) {
    return true;
  } else {
    return false;
  }
};

export const setAuthTokens = async (userDetails) => {
    await AsyncStorage.setItem("userDetails", JSON.stringify(userDetails));
    await AsyncStorage.setItem("accessToken", JSON.stringify(userDetails.token));
    await AsyncStorage.setItem(
      "refreshToken",
      JSON.stringify(userDetails.refreshToken)
    );
  };
  export const logout = async ({ history }) => {
    await AsyncStorage.removeItem("userDetails");
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
    history.push("/");
  };
  export const setNewTokens = async (access, refresh) => {
    await AsyncStorage.setItem("accessToken", JSON.stringify(access));
    await AsyncStorage.setItem("refreshToken", JSON.stringify(refresh));
  };
  export const getUserDetails = async () => {
    return JSON.parse(await AsyncStorage.getItem("userDetails"));
  };
  export const getAccessToken = async () => {
    return "Bearer " + JSON.parse(await AsyncStorage.getItem("accessToken"));
  };
  export const getRefreshToken = async () => {
    
    return JSON.parse(await AsyncStorage.getItem("refreshToken"));
  };
  export const setAuthHeader = async () => {
    axios.interceptors.request.use( async (axiosConfig) => {
      axiosConfig.headers.Authorization = "Bearer " + JSON.parse(await AsyncStorage.getItem("accessToken"));
      return axiosConfig;
    });
  };
  
  export const setRespInterceptor = async () => {
    axios.interceptors.response.use(
      async (response) => {
        return response;
      },
     (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          return axios
            .post(Constants.AuthRefreshAPI, {
              token: getRefreshToken(),
            })
            .then((res) => {
              const resp = res.data;
              setNewTokens(resp.token, resp.refreshToken);
  
              // 2) Change Authorization header
              axios.defaults.headers.common["Authorization"] =
                "Bearer " + resp.token;
  
              // 3) return originalRequest object with Axios.
              return axios(originalRequest);
            })
            .catch((err) => {
               AsyncStorage.removeItem("userDetails");
               AsyncStorage.removeItem("accessToken");
              AsyncStorage.removeItem("refreshToken");
            });
        }
        return Promise.reject(error);
      }
    );
  };
  
