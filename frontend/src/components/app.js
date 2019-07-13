import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Splash from './splash/splash';
import './default_styling/reset.css'
import './default_styling/style.css'

const App = () => (
    <div>
        <Switch>
            <Route exact path="/" component={Splash} />
        </Switch>
    </div>
);

export default App;