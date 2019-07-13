import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
import * as serviceWorker from './serviceWorker';

let store;
if (window.currentUser) {
    const preloadedState = {
        session: { id: window.currentUser.id },
        entities: {
            user: { [window.currentUser.id]: window.currentUser }
        }
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
} else {
    store = configureStore();
}

ReactDOM.render(<Root store={store}/>, document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
