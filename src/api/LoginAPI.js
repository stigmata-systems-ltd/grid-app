import Axios from 'axios';
import {AsyncStorage} from 'react-native';
import * as Constants from '../constants/APIConstants';

const LoginValidation = async (userDetails) => {
  try {
    let res = await Axios.post(Constants.LoginAPI, userDetails);
    AsyncStorage.setItem('userAuth', JSON.stringify(res.data));
    return JSON.parse('{"message":"' + res.data + '", "isValidated":true}');
  } catch (err) {
    console.log(err.response.data.message);
    return JSON.parse(
      '{"message":"' + err.response.data.message + '", "isValidated":false}',
    );
  }
};

export default {LoginValidation};
