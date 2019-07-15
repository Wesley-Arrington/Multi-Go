import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';

import Splash from './splash/splash';
import Game from './game/game'
import Lobby from './lobby/lobby'
import './default_styling/reset.css'
import './default_styling/style.css'
import Modal from './nav_bar/modal'

const App = () => (
    <div>
        <Modal />
        <Switch>
            <AuthRoute exact path="/" component={Splash} />
            <ProtectedRoute exact path="/lobby" component={Lobby} />
            <ProtectedRoute exact path="/game" component={Game} />
        </Switch>
    </div>
);

export default App;