import { NEW_GAME, UPDATE_TURN, UPDATE_SETTING } from '../actions/game_action';
import merge from 'lodash/merge';

function gameReducer(state = {}, action) {
    Object.freeze(state);
    let newState;
    switch (action.type) {
        case NEW_GAME:
            // debugger
            newState = merge({}, state);
            newState.id = action.game._id;
            newState.players = action.game.player_ids;
            newState.turn = 0;
            return newState;
        case UPDATE_TURN:
            newState = merge({}, state);
            newState.turn += 1;
            return newState;
        case UPDATE_SETTING:
            // debugger
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