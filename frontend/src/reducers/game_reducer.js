import { NEW_GAME, UPDATE_TURN, UPDATE_SETTING, PATCH_GAME, FETCH_GRID } from '../actions/game_action';
import merge from 'lodash/merge';

function gameReducer(state = {}, action) {
    Object.freeze(state);
    let newState;
    switch (action.type) {
        case NEW_GAME:
            newState = merge({}, state);
            newState.id = action.game._id;
            newState.name = action.game.name;
            newState.players = action.game.players;
            newState.turn = 0;
            newState.size = action.game.size;
            return newState;
        case PATCH_GAME:
            newState = merge({}, state);
            // 
            newState.id = action.game._id;
            newState.players = action.game.players;
            newState.turn = action.game.turn;
            newState.size = action.game.size;
            return newState;
        case FETCH_GRID:
            newState = merge({}, state);
            newState.fetchedGrid = action.game.grid;
            return newState;
        case UPDATE_TURN:
            newState = merge({}, state);
            newState.turn += 1;
            return newState;
        case UPDATE_SETTING:
            newState = merge({}, state);
            if (action.data.id) newState.id = action.data.id;
            if (action.data.players) newState.players = action.data.players;
            if (action.data.size) newState.size = action.data.size;
            // if (action.data.grid) newState.grid = action.data.grid;
            // kc: oh shit, 0 is a falsey value in JS
            if (action.data.turn || action.data.turn === 0) newState.turn = action.data.turn;
            return newState;
        default:
            return state
    }
}

export default gameReducer;