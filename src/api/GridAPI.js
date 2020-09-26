import Axios from 'axios';
import * as Constants from '../constants/APIConstants';

const GetGridList = async () => {
  try {
    const {data} = await Axios.get(Constants.GridListAPI);
    let dataForCenter = {};
    let gridData = [];
    var i = 1;
    for (var item in data.lstGridDtls) {
        let singleGrid = {
          lat: data.lstGridDtls[item].marker_latitide,
          lng: data.lstGridDtls[item].marker_longitude,
          gridId: data.lstGridDtls[item].gridId,
          gridNumber: data.lstGridDtls[item].gridno,
          rectCords: getGridCordinates(data.lstGridDtls[item].gridGeoLocation),
        };

        gridData.push(singleGrid);
        i++;
      
    }
    dataForCenter = {
      lat: data.gLatitide,
      lng: data.gLongitude
    }
    return {gridData, dataForCenter};
  } catch (err) {
    console.log('Errr');
    return err;
  }
};

const GetGridListDropdown = async () => {
  try {
    const {data} = await Axios.get(Constants.GridListDropdownAPI);
    return data;
  } catch (err) {
    console.log('Errr');
    return err;
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
  locationDetails.push({
    latitude: gridLocations[0].latitude,
    longitude: gridLocations[0].longitude,
  });
  return locationDetails;
};

const GetGridListDetailsById = async (id) => {
  try {
    const {data} = await Axios.get(Constants.GridListBasedOnIdAPI + "?id="+id);
    return data;
  } catch (err) {
    console.log('Errr' + JSON.stringify(err.response));
    return err;
  }
};

export default { GetGridList, GetGridListDropdown, GetGridListDetailsById };
