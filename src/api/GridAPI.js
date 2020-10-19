import Axios from 'axios';
import * as Constants from '../constants/APIConstants';
import MiddleWare from './Middleware';
import {AsyncStorage} from 'react-native';

const GetGridList = async () => {
  let dataForCenter = {};
  let gridData = [];
  const value = 'Bearer ' + (await AsyncStorage.getItem('accessToken'));
  let isSessionExpired = false;
  let isRefreshed = false;
  try {
    const {data} = await Axios.get(Constants.GridListAPI, {
      headers: {
        Authorization: value.toString(),
      },
    });
    var i = 1;
    for (var item in data.lstGridDtls) {
      // if(i <= 10)
      // {
      let singleGrid = {
        lat: data.lstGridDtls[item].marker_latitide,
        lng: data.lstGridDtls[item].marker_longitude,
        gridId: data.lstGridDtls[item].gridId,
        gridNumber: data.lstGridDtls[item].gridno,
        rectCords: getGridCordinates(data.lstGridDtls[item].gridGeoLocation),
        status: data.lstGridDtls[item].status,
        gridId: data.lstGridDtls[item].gridId,
        gridFillColor:
          data.lstGridDtls[item].status === 'Completed'
            ? 'rgba(70, 254, 24, 0.3)'
            : data.lstGridDtls[item].status === 'InProgress'
            ? 'rgba(254, 247, 77, 0.3)'
            : data.lstGridDtls[item].status === 'Completed' && data.lstGridDtls[item].isBilled 
            ? 'rgb(34,139,34, 0.3)'
            : 'rgba(255, 166, 32, 0.3)',
      };
      gridData.push(singleGrid);
      // }
      i++;
    }
    dataForCenter = {
      lat: data.gLatitide,
      lng: data.gLongitude,
    };
    return {gridData, dataForCenter, isSessionExpired, isRefreshed};
  } catch (err) {
    if (err.response.status === 401) {
      const obj = await MiddleWare.GetRefreshToken();
      if (!obj.isSessionExpired) {
        isRefreshed = true;
        return {gridData, dataForCenter, isSessionExpired,isRefreshed};
      } else {
        isSessionExpired = true;
        return {gridData, dataForCenter, isSessionExpired,isRefreshed};
      }
    } else return null;
  }
};

const GetGridListDropdown = async () => {
  const value = 'Bearer ' + (await AsyncStorage.getItem('accessToken'));
  let isSessionExpired = false;
  let isRefreshed = false;
  try {
    const {data} = await Axios.get(Constants.GridListDropdownAPI, {
      headers: {
        Authorization: value.toString(),
      },
    });
    let initialValue = {gridName: 'Select Grid', id: 0};
    data.unshift(initialValue);
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

getGridCordinates = (gridLocations) => {
  let locationDetails = [];
  for (var item in gridLocations) {
    let locationDetail = {
      latitude: gridLocations[item].latitude,
      longitude: gridLocations[item].longitude,
    };
    locationDetails.push(locationDetail);
  }
  if (Object.keys(locationDetails).length > 0) {
    locationDetails.push({
      latitude: gridLocations[0].latitude,
      longitude: gridLocations[0].longitude,
    });
  }
  return locationDetails;
};

const GetGridListDetailsById = async (id) => {
  const value = 'Bearer ' + (await AsyncStorage.getItem('accessToken'));
  let isSessionExpired = false;
  let isRefreshed = false;
  try {
    const {data} = await Axios.get(
      Constants.GridListBasedOnIdAPI + '?id=' + id,
      {
        headers: {
          Authorization: value.toString(),
        },
      },
    );
    let gridDataBasedOnId = data;
    return {gridDataBasedOnId, isSessionExpired, isRefreshed};
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

export default {GetGridList, GetGridListDropdown, GetGridListDetailsById};
