import { postGame, getGame, updateGame } from '../util/game_util';

export const NEW_GAME = 'NEW_GAME';
export const FETCH_GRID = 'FETCH_GRID';
export const PATCH_GAME = 'PATCH_GAME';

export const newGame = (data) => {
    return {
        type: NEW_GAME,
        // why is data nested twice?
        game_id: data.data._id
    }
}

export const fetchGrid = (game) => {
    return {
        type: FETCH_GRID,
        game: game.data
    }
}

export const changeGame = (game) => {
	return {
				type: PATCH_GAME,
				game: game.data 
	}
}

export const fetchGame = (id) => dispatch => {
    return getGame(id).then((game) => dispatch(fetchGrid(game)))
}

export const createGame = (data) => dispatch => {
    return postGame(data).then((data) => dispatch(newGame(data)))
}

export const patchGame = (data) => dispatch => {
		return updateGame(data).then(data => dispatch(changeGame(data)))
}