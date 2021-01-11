import {
  GET_GRID_DATA_REQUEST,
  GET_GRID_DATA_SUCCESS,
  GET_GRID_DATA_FAILURE,
  GET_INITIAL_REGION,
  GET_GRID_DROPDOWN_REQUEST,
  GET_GRID_DROPDOWN_SUCCESS,
  GET_GRID_DROPDOWN_FAILURE,
  SET_INITIAL_REGION,
  SET_CURRENT_LOCATION_HANDLED,
  GET_CURRENT_LOCATION_HANDLED,
  SET_CURRENT_GRID_DETAILS,
  SET_CURRENT_LOC,
  SET_WATCH_ID,
  GET_SEARCH_GRID,
  SET_SEARCH_GRID,
  SET_GRID_ID
} from '../actions/types';

const initialState = {
  isLoading: false,
  isRefreshing: false,
  initialRegion: {
    latitude: 10.391000434756279,
    longitude: 77.97916952213156,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  },
  errorMessage: [],
  isCurrentLocationHandled: false,
  currLoc: null,
  gridData: [],
  watchId: '',
  dataForCenter: {},
  gridDetailsDropdown: [],
  gridId: '0',
  currentGridDetails: ''
};

const gridReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GRID_DATA_REQUEST:
      return { ...state, isLoading: true };
    case GET_GRID_DATA_SUCCESS:
      return { ...state, isLoading: false, gridData: action.payload.gridData, dataForCenter: action.payload.dataForCenter, initialRegion: action.payload.initialRegion };
    case GET_GRID_DATA_FAILURE:
      return { ...state, isLoading: false, errorMessage: action.payload };
    case GET_INITIAL_REGION:
      return { ...state, initialRegion: action.payload };
    case GET_GRID_DROPDOWN_REQUEST:
      return {...state, isLoading: true};
    case GET_GRID_DROPDOWN_SUCCESS:
      return {...state, isLoading: false, gridDetailsDropdown: action.payload, gridId: action.payload[0].value};
    case GET_GRID_DROPDOWN_FAILURE:
      return {...state, isLoading: false, errorMessage: action.payload};
    case GET_CURRENT_LOCATION_HANDLED:
      return state;
    case GET_INITIAL_REGION:
      return state;
    case SET_CURRENT_LOCATION_HANDLED:
      return {...state, isCurrentLocationHandled: action.payload};
    case SET_INITIAL_REGION:
      return {...state, initialRegion: action.payload};
    case SET_CURRENT_GRID_DETAILS:
      return {...state, currentGridDetails: action.payload};
    case SET_CURRENT_LOC:
      return {...state, currLoc: action.payload};
    case SET_WATCH_ID:
      return {...state, watchId: action.payload};
    case GET_SEARCH_GRID:
      return {...state, isLoading: true};
    case SET_SEARCH_GRID:
      return {...state, isLoading: false, gridData: action.payload.gridData, initialRegion: action.payload.initialRegion};
    case SET_GRID_ID:
      return {...state, gridId: action.payload};
    default:
      return state;
  }
};

export default gridReducer;