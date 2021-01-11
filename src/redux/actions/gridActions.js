import {
  GET_GRID_DATA_SUCCESS,
  GET_GRID_DATA_REQUEST,
  GET_GRID_DATA_FAILURE,
  GET_INITIAL_REGION,
  GET_GRID_DROPDOWN_REQUEST,
  GET_GRID_DROPDOWN_SUCCESS,
  GET_GRID_DROPDOWN_FAILURE,
  SET_CURRENT_LOCATION_HANDLED,
  GET_CURRENT_LOCATION_HANDLED,
  SET_INITIAL_REGION,
  GET_CURRENT_GRID_DETAILS,
  SET_CURRENT_GRID_DETAILS,
  GET_CURRENT_LOC,
  SET_CURRENT_LOC,
  SET_WATCH_ID,
  SET_SEARCH_GRID,
  SET_SEARCH_GRID_ERROR,
  SET_GRID_ID
} from './types';
import axios from 'axios';
import * as APIConstants from '../../constants/APIConstants';
import { authorizationHeader } from '../utils';
import { GridStatus } from '../constants';

export const getGridDataRequest = () => ({ type: GET_GRID_DATA_REQUEST });
export const getGridDataSuccess = (gridData, dataForCenter, initialRegion) => ({ type: GET_GRID_DATA_SUCCESS, payload: { 'gridData': gridData, 'dataForCenter': dataForCenter, 'initialRegion': initialRegion } });
export const getGridDataFailure = (error) => ({ type: GET_GRID_DATA_FAILURE, payload: error });

export const getGridDropDownRequest = () => ({ type: GET_GRID_DROPDOWN_REQUEST });
export const getGridDropDownSuccess = (gridDataDropDown) => ({ type: GET_GRID_DROPDOWN_SUCCESS, payload: gridDataDropDown });
export const getGridDropDownFailure = (error) => ({ type: GET_GRID_DROPDOWN_FAILURE, payload: error });

export const getInitialRegion = () => ({ type: GET_INITIAL_REGION });
export const setInitialRegion = (initialRegion) => {
  return async (dispatch) => {
    dispatch({ type: SET_INITIAL_REGION, payload: initialRegion });
  }
}

export const getIsCurrentLocationHandled = () => ({ type: GET_CURRENT_LOCATION_HANDLED });
export const setIsCurrentLocationDisabled = (isCurrentLocationHandled) => {
  return async (dispatch) => {
    dispatch({ type: SET_CURRENT_LOCATION_HANDLED, payload: isCurrentLocationHandled });
  }
}

export const setWatchId = (value) => {
  return async (dispatch) => {
    dispatch({ type: SET_WATCH_ID, payload: value });
  }
}

export const getSearchGrid = () => {
  return async (dispatch) => {
    dispatch({ type: GET_SEARCH_GRID });
  }
}

export const setSearchGrid = (gridData, initialRegion) => {
  return async (dispatch) => {
    dispatch({ type: SET_SEARCH_GRID, payload: { 'gridData': gridData, 'initialRegion': initialRegion } });
  }
}

export const setGridId = (value) => {
  return async (dispatch) => {
    dispatch({  type: SET_GRID_ID, payload: value});
  }
}

export const setSearchGridError = (error) => ({type: SET_SEARCH_GRID_ERROR, payload: error});

export const getCurrentGridDetails = () => ({ type: GET_CURRENT_GRID_DETAILS });
export const setCurrentGridDetails = (value) => {
  return async (dispatch) => {
    dispatch({ type: SET_CURRENT_GRID_DETAILS, payload: value })
  }
}

export const getCurrentLoc = () => ({ type: GET_CURRENT_LOC });
export const setCurrentLoc = (value) => {
  return async (dispatch) => {
    dispatch({ type: SET_CURRENT_LOC, payload: value })
  }
}

export const getGridData = () => {
  return async dispatch => {
    dispatch(getGridDataRequest());
    try {
      let dataForCenter = {};
      let gridData = [];
      let authorisation = await authorizationHeader();
      let response = await axios.get(APIConstants.GridListAPI, { headers: { Authorization: authorisation } });
      var i = 1;
      for (var item in response.data.lstGridDtls) {
        // if(i <= 10)
        // {
        let singleGrid = {
          lat: response.data.lstGridDtls[item].marker_latitide,
          lng: response.data.lstGridDtls[item].marker_longitude,
          gridId: response.data.lstGridDtls[item].gridId,
          gridNumber: response.data.lstGridDtls[item].gridno,
          rectCords: getGridCordinates(response.data.lstGridDtls[item].gridGeoLocation),
          status: response.data.lstGridDtls[item].status,
          gridId: response.data.lstGridDtls[item].gridId,
          gridFillColor:
            response.data.lstGridDtls[item].status === GridStatus.Completed
              ? 'rgba(70, 254, 24, 0.3)'
              : response.data.lstGridDtls[item].status === GridStatus.InProgress
                ? 'rgba(254, 247, 77, 0.3)'
                : response.data.lstGridDtls[item].status === GridStatus.Completed && response.data.lstGridDtls[item].isBilled
                  ? 'rgb(34,139,34, 0.3)'
                  : 'rgba(255, 166, 32, 0.3)',
        };
        gridData.push(singleGrid);
        // }
        i++;
      }
      dataForCenter = {
        lat: response.data.gLatitide,
        lng: response.data.gLongitude,
      };
      let initialRegion = getDeltas(18.9651515, 72.8002582142857);
      dispatch(getGridDataSuccess(gridData, dataForCenter, initialRegion));
    }
    catch (error) {
      dispatch(getGridDataFailure(error));
    }
  }
}

export const getGridDropDownData = () => {
  return async dispatch => {
    dispatch(getGridDropDownRequest());
    try {
      let authorisation = await authorizationHeader();
      let response = await axios.get(APIConstants.GridListDropdownAPI, { headers: { Authorization: authorisation } });
      let initialValue = { gridName: 'Select Grid', id: 0 };
      response.data.unshift(initialValue);
      let gridDetailsDropdown = [];
      if (
        response.data !== null &&
        response.data !== undefined &&
        Object.keys(response.data).length > 0
      ) {
        for (let item in response.data) {
          let gridDataItem = {
            label: response.data[item].gridName,
            value: response.data[item].id,
          };
          gridDetailsDropdown.push(gridDataItem);
        }
      }
      console.log("Grid Drop Down :" + gridDetailsDropdown);
      dispatch(getGridDropDownSuccess(gridDetailsDropdown));
    }
    catch (error) {
      dispatch(getGridDropDownFailure(error));
    }
  }
}

export const getInitialRegionData = () => {
  return dispatch => {
    let initialRegion = getDeltas(18.9651515, 72.8002582142857);
    dispatch(getInitialRegion(initialRegion));
  }
}

export const searchSpecificGrid = (gridData, gridId) => {
  return dispatch => {
    try{
      let centerRegion = {};

      for (let item in gridData) {
        if (gridData[item].gridId === gridId) {
          gridData[item].gridFillColor = 'rgba(0, 230, 64, 0.3)';
          centerRegion = getDeltas(gridData[item].lat, gridData[item].lng);
        } else {
          gridData[item].gridFillColor =
            gridData[item].status === GridStatus.Completed
              ? 'rgba(70, 254, 24, 0.3)'
              : gridData[item].status === GridStatus.InProgress
                ? 'rgba(254, 247, 77, 0.3)'
                : gridData[item].status === GridStatus.Completed && gridData[item].isBilled
                  ? 'rgb(34,139,34, 0.3)'
                  : 'rgba(255, 166, 32, 0.3)';
        }
      }
      
      dispatch(setSearchGrid(gridData, centerRegion));
    }
    catch(error){
      dispatch(setSearchGridError(error));
    }
  }
}

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


getDeltas = (lat, lng, distance = 5) => {
  const oneDegreeOfLatitudeInMeters = 90.32 * 25;

  const latitudeDelta = distance / oneDegreeOfLatitudeInMeters;
  const longitudeDelta =
    distance /
    (oneDegreeOfLatitudeInMeters * Math.cos(lat * (Math.PI / 180)));

  return {
    latitude: lat,
    longitude: lng,
    latitudeDelta,
    longitudeDelta,
  };
};



