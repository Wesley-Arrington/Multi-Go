import { NEW_GAME, GET_VALID_GAMES } from '../actions/game_action';
import merge from 'lodash/merge';

function gamesReducer(state = {}, action) {
    Object.freeze(state);
    let newState;
    switch (action.type) {
        case NEW_GAME:
            newState = merge({}, state);
            newState[Object.keys(newState).length] = action.game;
            return newState;

        case GET_VALID_GAMES:
            newState = merge({}, state);
            // kc: order games from full to not full. 
            let fullgames = [];
            let notfullgames = []
            let games = action.games.forEach(game => {
                if (game.players.includes(null)) {
                    notfullgames.push(game)
                } else {
                    fullgames.push(game)
                }
            })

            games = fullgames.concat(notfullgames);
            newState = games;
            return newState;
        default:
            return state
    }
}

export default gamesReducer;