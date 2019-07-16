import axios from 'axios';

export const postGame = (data) => {
    return axios.post('/api/games', data);
};

export const getGame = (id) => {
    return axios.get(`/api/games/${id}`)
}