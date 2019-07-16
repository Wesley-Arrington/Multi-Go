import { combineReducers } from 'redux';
import gamesReducer from './games_reducer';

export default combineReducers({
    games: gamesReducer
});

