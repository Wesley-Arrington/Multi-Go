import axios from 'axios';

export const postGame = (data) => {

    return axios.post('/api/games', data);
};