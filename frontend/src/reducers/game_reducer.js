import { NEW_GAME, FETCH_GRID, PATCH_GAME, GET_VALID_GAMES, UPDATE_TURN } from '../actions/game_action';
import merge from 'lodash/merge';

function gameReducer(state = {}, action) {
    Object.freeze(state);
    let newState;
    switch (action.type) {
        case NEW_GAME:
            newState = merge({}, state);
            newState.id = action.game_id;
            newState.turn = 0;
            // kc: placeholder players 1,2,3 until we get join working
            newState.players = [1,2,3];
            return newState;
        case UPDATE_TURN:
            newState = merge({}, state);
            newState.turn += 1;
            return newState;
        // case FETCH_GRID:
        //     newState = merge({}, state);
        //     newState["grid"] = action.game.grid;
        //     newState["turn"] = action.game.turn;
        //     newState["player_ids"] = action.game.player_ids;
        //     return newState;

        // case PATCH_GAME:
        //     newState = merge({}, state);
        //     newState["grid"] = action.game.grid;
        //     newState["turn"] = action.game.turn;
        //     return newState;
        // case GET_VALID_GAMES:
        //     newState = merge({}, state);
        //     newState = JSON.parse(JSON.stringify(action.games))
        //     return newState;
        default:
            return state
    }
}

export default gameReducer;