import { combineReducers } from 'redux';
import gamesReducer from './games_reducer';
import gameReducer from './game_reducer';

export default combineReducers({
    games: gamesReducer,
    game: gameReducer

});

