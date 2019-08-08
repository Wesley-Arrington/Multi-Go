import { NEW_GAME, FETCH_GRID, PATCH_GAME, GET_VALID_GAMES } from '../actions/game_action';
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
            newState["grid"] = action.game.grid;
            newState["turn"] = action.game.turn;
            newState["player_ids"] = action.game.player_ids;
            return newState;

        case PATCH_GAME:
            newState = merge({}, state);
            newState["grid"] = action.game.grid;
            newState["turn"] = action.game.turn;
            return newState;
            
        case GET_VALID_GAMES:
            newState = merge({}, state);
            newState = JSON.parse(JSON.stringify(action.games))
            // newState["grid"] = action.games.grid;
            // newState["turn"] = action.games.turn;
            // newState["player_ids"] = action.games.player_ids;
            return newState;
        default:
            return state
    }
}

export default gamesReducer;