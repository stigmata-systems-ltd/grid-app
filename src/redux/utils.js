import { AsyncStorage } from 'react-native';

export const authorizationHeader = async () => { return 'Bearer ' + (await AsyncStorage.getItem('accessToken')) };

