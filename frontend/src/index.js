import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
import * as serviceWorker from './serviceWorker';

// KC: from MERN tutorial frontendAuth
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './util/session_api_util';
import { logout } from './actions/session_actions'

import axios from 'axios';

window.axios = axios; 

let store;

if (sessionStorage.jwtToken) {
    setAuthToken(sessionStorage.jwtToken);
    const decodedUser = jwt_decode(sessionStorage.jwtToken);
    const preloadedState = { session: { isAuthenticated: true, user: decodedUser } };

    store = configureStore(preloadedState);

    const currentTime = Date.now() / 1000;

    if (decodedUser.exp < currentTime) {
        store.dispatch(logout());
        window.location.href = '/login';
    } 
    window.dispatch = store.dispatch;
    window.store = store;
} else {
    // if this is a first time user, start w/ emptys tore
    store = configureStore({});
    window.dispatch = store.dispatch;
    window.store = store;
}


// KC: this looks like FSP stuff.
// if (window.currentUser) {
//     const preloadedState = {
//         session: { id: window.currentUser.id },
//         entities: {
//             user: { [window.currentUser.id]: window.currentUser }
//         }
//     };
//     store = configureStore(preloadedState);
//     delete window.currentUser;
// } else {
//     store = configureStore();
// }

window.dispatch = store.dispatch;
window.logout = logout;
window.store = store;

ReactDOM.render(<Root store={store}/>, document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
