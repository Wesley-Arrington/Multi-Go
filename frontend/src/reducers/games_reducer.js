import { NEW_GAME } from '../actions/game_action';
import { FETCH_GRID } from '../actions/game_action';

import merge from 'lodash/merge';


function gamesReducer(state = {}, action) {
    Object.freeze(state);
    let newState;
    switch (action.type) {
        case NEW_GAME:
            newState = merge({}, state);
            newState["game_id"] = action.game_id;
            return newState;

        case FETCH_GRID:
            newState = merge({}, state);
            newState["grid"] = action.game.grid
            return newState;
        default:
            return state
    }
}

export default gamesReducer;