import { NEW_GAME } from '../actions/game_action';
import { FETCH_GRID } from '../actions/game_action';

function gamesReducer(state = null, action) {
    Object.freeze(state);
    let newState;
    switch (action.type) {
        case NEW_GAME:

            return action.game_id;
        case FETCH_GRID:
            debugger
            newState = Object.assign(state);
            return action;
        default:
            return state
    }
}

export default gamesReducer;