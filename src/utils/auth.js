import axios from 'axios';
import {AsyncStorage} from 'react-native';
import * as Constants from '../constants/APIConstants';

export const isUserLoggedIn = async () => {
  if ((await AsyncStorage.getItem('accessToken')) === false || (await AsyncStorage.getItem('accessToken')) === null ) {
    return false;
  } else {
    return true;
  }
};

export const setAuthTokens = async (userDetails) => {
  console.log("Hitted");
  await AsyncStorage.setItem('userDetails', JSON.stringify(userDetails));
  await AsyncStorage.setItem('accessToken', JSON.stringify(userDetails.token));
  await AsyncStorage.setItem(
    'refreshToken',
    JSON.stringify(userDetails.refreshToken),
  );
  await AsyncStorage.setItem('IsSessionExpired', '0');
  
};
export const logout = async ({history}) => {
  await AsyncStorage.removeItem('userDetails');
  await AsyncStorage.removeItem('accessToken');
  await AsyncStorage.removeItem('refreshToken');
  history.push('/');
};
export const setNewTokens = async (access, refresh) => {
  await AsyncStorage.setItem('accessToken', JSON.stringify(access));
  await AsyncStorage.setItem('refreshToken', JSON.stringify(refresh));
};
export const getUserDetails = async () => {
  return JSON.parse(await AsyncStorage.getItem('userDetails'));
};
export const getAccessToken = async () => {
  return 'Bearer ' + JSON.parse(await AsyncStorage.getItem('accessToken'));
};
export const getRefreshToken = async () => {
  return JSON.parse(await AsyncStorage.getItem('refreshToken'));
};
export const setAuthHeader = async () => {
 
  axios.interceptors.request.use(async (axiosConfig) => {
    axiosConfig.headers.Authorization =
      'Bearer ' + await AsyncStorage.getItem('accessToken');
    return axiosConfig;
  });
};

export const setRespInterceptor =  () => {
  axios.interceptors.response.use(
    (response) => {
      console.log("Interceptor response : " + response);
      return response;
    },
    (error) => {
      console.log("Error interceptor response : " + error.response.status);
      const originalRequest = error.config;
      if (error.response.status === 401) {
        originalRequest._retry = true;
        return axios
          .post(Constants.AuthRefreshAPI, {
            token: getRefreshToken(),
          })
          .then((res) => {
            const resp = res.data;
            setNewTokens(resp.token, resp.refreshToken);

            // 2) Change Authorization header
            axios.defaults.headers.common['Authorization'] =
              'Bearer ' + resp.token;

            // 3) return originalRequest object with Axios.
            return axios(originalRequest);
          })
          .catch(async (err) => {
            AsyncStorage.removeItem('userDetails');
            AsyncStorage.removeItem('accessToken');
            AsyncStorage.removeItem('refreshToken');
          });
      }
      return Promise.reject(error);
    },
  );
};
