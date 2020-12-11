import {combineReducers} from 'redux';
import gridReducer from '../reducers/gridReducer';
import authenticateReducer from '../reducers/authenticateReducer';

const rootReducer = combineReducers({
    grid: gridReducer,
    auth: authenticateReducer
})

export default rootReducer;