import { postGame } from '../util/game_util';

export const NEW_GAME = 'NEW_GAME';

export const newGame = (data) => {
    return {
        type: NEW_GAME,
        // why is data nested twice?
        data: data.data
    }
}

export const createGame = (data) => dispatch => {
    return postGame(data).then((data) => dispatch(newGame(data)))
}