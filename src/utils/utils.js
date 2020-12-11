import {AsyncStorage} from 'react-native';

export const getRememberOptions = async () => {
  let rememberUsername = await AsyncStorage.getItem('rememberUsername');
  let rememberPassword = await AsyncStorage.getItem('rememberPassword');
  let rememberOption = await AsyncStorage.getItem('rememberOption');
  if (
    (rememberUsername != null || rememberUsername != undefined) &&
    (rememberPassword != null || rememberPassword != undefined) &&
    (rememberOption != null || rememberOption != undefined)
  ) {
    return {
      rememberUsername: rememberUsername,
      rememberPassword: rememberPassword,
      rememberOption: rememberOption === "1" ? true : false,
    };
  } else {
    return null;
  }
};

export const setRememberOptions = async (rememberOpt) => {
  console.log("Remeber Option Set : " + JSON.stringify(rememberOpt));
  await AsyncStorage.removeItem('rememberUsername');
  await AsyncStorage.removeItem('rememberUsername');
  await AsyncStorage.removeItem('rememberUsername');
  await AsyncStorage.setItem(
    'rememberUsername',
    rememberOpt.rememberUsername,
  );
  await AsyncStorage.setItem(
    'rememberPassword',
    rememberOpt.rememberPassword,
  );
  await AsyncStorage.setItem('rememberOption', rememberOpt.rememberOption ? "1" : "0");
  return true;
};

export const isUserLoggedIn = async () => {
  if (
    (await AsyncStorage.getItem('accessToken')) === false ||
    (await AsyncStorage.getItem('accessToken')) === null
  ) {
    return false;
  } else {
    return true;
  }
};


export const setAuthTokens = async (userDetails) => {
    await AsyncStorage.setItem('userDetails', JSON.stringify(userDetails));
    await AsyncStorage.setItem('accessToken', userDetails.token);
    await AsyncStorage.setItem(
      'refreshToken',
      userDetails.refreshToken
    );
    await AsyncStorage.setItem('IsSessionExpired', '0');
    
  };