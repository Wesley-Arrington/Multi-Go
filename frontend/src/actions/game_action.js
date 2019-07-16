import { postGame } from '../util/game_util';

export const NEW_GAME = 'NEW_GAME';

export const newGame = (data) => {
    // debugger
    // this would go to reducers?
    return {
        type: NEW_GAME,
        data
    }
}

export const createGame = (data) => dispatch => {
    // the above didn't come down here.
    // debugger
    return postGame(data).then((data) => dispatch(newGame(data)))
}