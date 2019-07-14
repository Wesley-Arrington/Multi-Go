import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Splash from './splash/splash';
import Game from './game/game'
import Lobby from './lobby/lobby'
import './default_styling/reset.css'
import './default_styling/style.css'

const App = () => (
    <div>
        <Switch>
            <Route exact path="/" component={Splash} />
            <Route exact path="/lobby" component={Lobby} />
            <Route exact path="/game" component={Game} />
        </Switch>
    </div>
);

export default App;