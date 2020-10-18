import Axios from 'axios';
import * as Constants from '../constants/APIConstants';
import FormData from 'form-data';
import {AsyncStorage} from 'react-native';
import MiddleWare from './Middleware';

const GetLayerDetails = async () => {
  const value = 'Bearer ' + (await AsyncStorage.getItem('accessToken'));
  let isSessionExpired = false;
  let isRefreshed = false;
  try {
    const {data} = await Axios.get(Constants.LayerDetailsAPI, {
      headers: {
        Authorization: value.toString(),
      },
    });
    let layerDetailsOriginal = data;
    return {layerDetailsOriginal, isSessionExpired, isRefreshed};
  } catch (err) {
    if (err.response.status === 401) {
      const obj = await MiddleWare.GetRefreshToken();
      if (!obj.isSessionExpired) {
        isRefreshed = true;
        return {isSessionExpired, isRefreshed}
      } else {
        isSessionExpired = true;
        return {isSessionExpired, isRefreshed};
      }
    } else return null;
  }
};

const GetLayerListDetails = async (layerDetailsId) => {
  const value = 'Bearer ' + (await AsyncStorage.getItem('accessToken'));
  let isSessionExpired = false;
  let isRefreshed = false;
  try {
    console.log(layerDetailsId);
    const {data} = await Axios.get(
      Constants.LayerListAPI + '?layerDtlsId=' + layerDetailsId,
      {
        headers: {
          Authorization: value.toString(),
        },
      },
    );
    let LayerListDetails = data;
    return {LayerListDetails, isSessionExpired, isRefreshed};
  } catch (err) {
    if (err.response.status === 401) {
      const obj = await MiddleWare.GetRefreshToken();
      if (!obj.isSessionExpired) {
        isRefreshed = true;
        return {isSessionExpired, isRefreshed};
      } else {
        isSessionExpired = true;
        return {isSessionExpired, isRefreshed};
      }
    } else return null;
  }
};

const LayerUpload = async (layerDetailsId, imageDetail, fileName) => {
  const value = 'Bearer ' + (await AsyncStorage.getItem('accessToken'));
  let isSessionExpired = false;
  let isRefreshed = false;
  try {
    var formData = new FormData();
    formData.append('layerDtlsId', layerDetailsId);
    formData.append('uploadDocs', imageDetail);
    formData.append('fileName', fileName);
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: value.toString(),
      },
    };

    let {data} = await Axios.post(Constants.LayerUploadAPI, formData, config);

    return {data, isSessionExpired, isRefreshed};
  } catch (err) {
    if (err.response.status === 401) {
      const obj = await MiddleWare.GetRefreshToken();
      if (!obj.isSessionExpired) {
        isRefreshed = true;
        return {isSessionExpired, isRefreshed};
      } else {
        isSessionExpired = true;
        return {isSessionExpired, isRefreshed};
      }
    } else return null;
  }
};

export default {GetLayerDetails, LayerUpload, GetLayerListDetails};
