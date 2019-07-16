import { NEW_GAME } from '../actions/game_action';

function gamesReducer(state = null, action) {
    debugger
    switch (action.type) {
        case NEW_GAME:
            return action.data.grid;
        default:
            return state
    }
}

export default gamesReducer;