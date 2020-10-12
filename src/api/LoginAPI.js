import Axios from 'axios';
import {AsyncStorage} from 'react-native';
import * as Constants from '../constants/APIConstants';
import { setAuthTokens } from '../utils/auth';

const LoginValidation = async (userDetails) => {
  try {
    let res = await Axios.post(Constants.LoginAPI, userDetails);
    await setAuthTokens(res.data);
    return JSON.parse('{"message":"' + res.data + '", "isValidated":true}');
  } catch (err) {
    return JSON.parse(
      '{"message":"' + err.response.data.message + '", "isValidated":false}',
    );
  }
};

export default {LoginValidation};
