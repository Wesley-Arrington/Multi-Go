import { combineReducers } from 'redux';
import session from './session_reducer';
// import entitiesReducer from './entities';
// import errorsReducer from './errors'
import uiReducer from './ui_reducer.js'


export default combineReducers({
    // entities: entitiesReducer,
    // errors: errorsReducer,
    session,
    ui: uiReducer
});