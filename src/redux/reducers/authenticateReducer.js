import {
  AUTHENTICATE_LOGIN_REQUEST,
  AUTHENTICATE_LOGIN_SUCESS,
  AUTHENTICATE_LOGIN_FAILURE,
  SET_USERNAME,
  SET_PASSWORD,
  SET_REMEMBER_OPTION,
  GET_REMEMBER_OPTION,
} from '../actions/types';

const initialState = {
  isLoading: false,
  username: '',
  password: '',
  rememberme: false,
  rememberUsername: '',
  rememberPassword: '',
  rememberOption: false,
  errorMessage: '',
  userDetail: {},
};

const authenticateReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE_LOGIN_REQUEST:
      return {...state, isLoading: true};
    case AUTHENTICATE_LOGIN_FAILURE:
      return {...state, isLoading: false, errorMessage: action.payload};
    case AUTHENTICATE_LOGIN_SUCESS:
      return {...state, isLoading: false, userDetail: action.payload, errorMessage: ''};
    case SET_USERNAME:
      return {...state, username: action.payload};
    case SET_PASSWORD:
      return {...state, password: action.payload};
    case SET_REMEMBER_OPTION:
      if (action.payload.rememberOption === true) {
        return {
          ...state,
          rememberUsername: action.payload.rememberUsername,
          rememberPassword: action.payload.rememberPassword,
          rememberOption: action.payload.rememberOption,
          rememberme: action.payload.rememberOption,
        };
      } else {
        return {
          ...state,
          rememberUsername: '',
          rememberPassword: '',
          rememberOption: false,
          rememberme: action.payload.rememberOption ,
        };
      }
    case GET_REMEMBER_OPTION:
      return {
        ...state,
        rememberUsername: action.payload.rememberUsername,
        rememberPassword: action.payload.rememberPassword,
        rememberOption: action.payload.rememberOption,
      };
    default:
      return state;
  }
};

export default authenticateReducer;
