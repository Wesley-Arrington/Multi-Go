import axios from 'axios';

export const postGame = (data) => {
    return axios.post('/api/games', data);
};

export const getGame = (id) => {
    return axios.get(`/api/games/${id}`);
}

export const getGames = () => {
	return axios.get(`/api/games`);
}

export const updateGame = (game_id, data) => {
	return axios.patch(`/api/games/${game_id}`, data);
}

export const deleteGame = (id) => {
	return axios.delete(`/api/games/${id}`);
}