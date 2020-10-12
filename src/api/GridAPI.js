import Axios from 'axios';
import * as Constants from '../constants/APIConstants';

const GetGridList = async () => {
  try {
    const {data} = await Axios.get(Constants.GridListAPI);
    let dataForCenter = {};
    let gridData = [];
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
          gridFillColor: 'rgba(151, 253, 0, 0.3)',
        };
        gridData.push(singleGrid);
      // }
      i++;
    }
    dataForCenter = {
      lat: data.gLatitide,
      lng: data.gLongitude,
    };
    return {gridData, dataForCenter};
  } catch (err) {
    return null;
  }
};

const GetGridListDropdown = async () => {
  try {
    const {data} = await Axios.get(Constants.GridListDropdownAPI);
    let initialValue = {gridName: 'Select Grid', id: 0};
    data.unshift(initialValue);
    return data;
  } catch (err) {
    return null;
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
  try {
    const {data} = await Axios.get(
      Constants.GridListBasedOnIdAPI + '?id=' + id,
    );
    return data;
  } catch (err) {
    return err;
  }
};

export default {GetGridList, GetGridListDropdown, GetGridListDetailsById};
