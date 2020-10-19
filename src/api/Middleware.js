import axios from 'axios';
import {AsyncStorage} from 'react-native';
import * as Constants from '../constants/APIConstants';

const GetAccessToken = async () => {
  return value.toString();
};

const GetRefreshToken = async () => {
  let values = await AsyncStorage.getItem('refreshToken');
  const refreshToken = values;
  try {
    let res = await axios.post(Constants.AuthRefreshAPI, {token: refreshToken});
    if (res.data !== undefined && res.data !== null && res.data.isAPIValid) {
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('refreshToken');
      await AsyncStorage.setItem('accessToken', res.data.token);
      await AsyncStorage.setItem('refreshToken', res.data.refreshToken);
      return JSON.parse('{"isSessionExpired" : false}');
    } else {
      return JSON.parse('{"isSessionExpired" : true}');
    }
  } catch (err) {
    return JSON.parse('{"isSessionExpired" : true}');
  }
};

const IsUserLoggedIn = async () => {
  if (
    (await AsyncStorage.getItem('accessToken')) === false ||
    (await AsyncStorage.getItem('refreshToken')) === null
  ) {
    return false;
  } else {
    return true;
  }
};

const clearSession = async () => {
  await AsyncStorage.removeItem('accessToken');
  await AsyncStorage.removeItem('refreshToken');
  await AsyncStorage.removeItem('userDetails');
};

export default {GetRefreshToken, GetAccessToken, IsUserLoggedIn, clearSession};
