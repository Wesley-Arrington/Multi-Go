import axios from 'axios';

export const postGame = (data) => {
    debugger
    return axios.post('/api/games', data);
};