import { NEW_GAME, UPDATE_TURN, UPDATE_SETTING, PATCH_GAME } from '../actions/game_action';
import merge from 'lodash/merge';

function gameReducer(state = {}, action) {
    Object.freeze(state);
    let newState;
    switch (action.type) {
        case NEW_GAME:
            newState = merge({}, state);
            newState.id = action.game._id;
            newState.players = action.game.player_ids;
            newState.turn = 0;
            return newState;
        case PATCH_GAME:
            newState = merge({}, state);
            newState.id = action.game._id;
            newState.players = action.game.player_ids;
            newState.turn = parseInt(action.game.turn,10);
            return newState;
        case UPDATE_TURN:
            newState = merge({}, state);
            newState.turn += 1;
            return newState;
        case UPDATE_SETTING:
            newState = merge({}, state);
            if (action.data.id) newState.id = action.data.id;
            if (action.data.players) newState.players = action.data.players;
            // if (action.data.grid) newState.grid = action.data.grid;
            if (action.data.turn) newState.turn = action.data.turn;
            return newState;
        default:
            return state
    }
}

export default gameReducer;