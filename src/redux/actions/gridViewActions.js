import { GET_GRID_VIEW_REQUEST, GET_GRID_VIEW_SUCCESS, GET_GRID_VIEW_FAILURE } from './types';
import axios from 'axios';
import * as APIConstants from '../../constants/APIConstants';
import { authorizationHeader } from '../utils';
import { GridStatus } from '../constants';

