import { NEW_GAME, UPDATE_TURN, UPDATE_SETTING } from '../actions/game_action';
import merge from 'lodash/merge';

function gameReducer(state = {}, action) {
    Object.freeze(state);
    let newState;
    switch (action.type) {
        case NEW_GAME:
            newState = merge({}, state);
            newState.id = action.game_id;
            // newState.players = new Array(2);
            newState.turn = 0;
            return newState;
        case UPDATE_TURN:
            newState = merge({}, state);
            newState.turn += 1;
            return newState;
        case UPDATE_SETTING:
            newState = merge({}, state);

            if (action.data.id) newState.id = action.data.id;
            if (action.data.players) newState.players = action.data.players;
    //      newState.turn = 0;
            return newState;
        default:
            return state
    }
}

export default gameReducer;