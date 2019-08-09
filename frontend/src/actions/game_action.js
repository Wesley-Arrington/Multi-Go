import { postGame, getGame, updateGame, getGames } from '../util/game_util';

export const NEW_GAME = 'NEW_GAME';
export const FETCH_GRID = 'FETCH_GRID';
export const PATCH_GAME = 'PATCH_GAME';
export const GET_VALID_GAMES = "GET_VALID_GAMES";

export const UPDATE_TURN = 'UPDATE_TURN';
export const UPDATE_SETTING = 'UPDATE_SETTING';

export const updateSetting = (data) => {
    return {
        type: UPDATE_SETTING,
        data
    }
}

export const updateTurn = () => {
    return {
        type: UPDATE_TURN
    }
}

export const receiveValidGames = (games) => {
    return {
        type: GET_VALID_GAMES,
        games: games.data
    }
}

export const getValidGames = () => dispatch => {
    return getGames().then((games) => {
        dispatch(receiveValidGames(games))
        }
     )
}

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

export const patchGame = (game_id, data) => dispatch => {
    return updateGame(game_id, data).then(data => dispatch(changeGame(data)))
}