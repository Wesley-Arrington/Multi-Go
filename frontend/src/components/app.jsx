
import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';

import SplashContainer from './splash/splash_container';
import GameContainer from './game/game_container'
import Lobby from './lobby/lobby'
import './default_styling/reset.css'
import './default_styling/style.css'
import Modal from './nav_bar/modal'

const App = () => (

    <div>
        <Modal />
        <Switch>
            <Route exact path="/" component={SplashContainer} />
            <Route exact path="/lobby" component={Lobby} />
            <Route exact path="/game" component={GameContainer} />
        </Switch>
    </div>
);

export default App;