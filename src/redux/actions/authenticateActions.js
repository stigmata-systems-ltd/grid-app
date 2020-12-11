import {
  AUTHENTICATE_LOGIN_REQUEST,
  AUTHENTICATE_LOGIN_SUCESS,
  AUTHENTICATE_LOGIN_FAILURE,
  SET_USERNAME,
  SET_PASSWORD,
  SET_REMEMBER_OPTION,
  GET_REMEMBER_OPTION,
} from './types';
import axios from 'axios';
import * as APIConstants from '../../constants/APIConstants';
import store from '../store';
import {
  getRememberOptions,
  setRememberOptions,
  setAuthTokens
} from '../../utils/utils';

export const authentiateLoginRequest = () => ({
  type: AUTHENTICATE_LOGIN_REQUEST,
});

export const authentiateLoginSuccess = (json) => ({
  type: AUTHENTICATE_LOGIN_SUCESS,
  payload: json,
});

export const authenticateLoginFailure = (error) => ({
  type: AUTHENTICATE_LOGIN_FAILURE,
  payload: error,
});

export const authenticateLogin = (userDetail) => {
  return async (dispatch) => {
    dispatch(authentiateLoginRequest());
    try {
      let response = await axios.post(APIConstants.LoginAPI, userDetail);
      await setAuthTokens(response.data);
      dispatch(authentiateLoginSuccess(response.data));
    } catch (error) {
      dispatch(authenticateLoginFailure(error.response.data.message));
    }
  };
};
export const setUsername = (value) => {
  return async (dispatch) => {
    dispatch({type: SET_USERNAME, payload: value});
  };
};

export const setPassword = (value) => {
  return async (dispatch) => {
    dispatch({
      type: SET_PASSWORD,
      payload: value,
    });
  };
};
export const setRememberOption = (remember) => {
  let {username, password} = store.getState();
  console.log(username + " " + password + " " + remember);
  let rememberOpt = {
    rememberOption: remember,
    rememberUsername: username,
    rememberPassword: password,
  };
  console.log("Remee : " + JSON.stringify(rememberOpt));
  return async (dispatch) => {
    await setRememberOptions(rememberOpt);
    console.log("Sett");
    dispatch({
      type: SET_REMEMBER_OPTION,
      payload: rememberOpt,
    });
  };
};
export const getRememberOption = () => {
  return async (dispatch) => {
    let rememberOptions = await getRememberOptions();
    console.log("Get Remember Option : " +rememberOptions);
    if (rememberOptions !== null) {
      dispatch({
        type: GET_REMEMBER_OPTION,
        payload: rememberOptions,
      });
    }
  };
};
