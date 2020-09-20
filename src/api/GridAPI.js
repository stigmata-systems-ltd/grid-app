import Axios from 'axios';
import * as Constants from '../constants/APIConstants';

const GetGridList = async (storeId) => {
  try {
    const {data} = await Axios.get(Constants.GridListAPI);

    let gridData = [];
    var i = 1;
    for (var item in data) {
      if (i < 10) {
        let singleGrid = {
          lat: data[item].marker_latitide,
          lng: data[item].marker_longitude,
          gridId: data[item].gridId,
          gridNumber: data[item].gridno,
          rectCords: getGridCordinates(data[item].gridGeoLocation),
        };

        gridData.push(singleGrid);
        i++;
      }
    }
    return gridData;
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

export default {GetGridList};
