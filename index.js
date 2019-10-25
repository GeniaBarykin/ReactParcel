import React from 'react';
import { render } from 'react-dom';

import { BrowserRouter, Route, Switch } from "react-router-dom";
import {AppLayout} from "./components/app.page";
import {Login} from "./components/login.page";
import {Auth} from "./components/auth";


function App() {
    return (
        <div className="App">
            <Switch>
                <Route exact path="/" component={Login} />
                <Auth >
                    {/*<Route exact path="/play" component={HighScores} />*/}
                    <Route exact path="/app" component={AppLayout}/>
                </Auth>
                <Route path="*" component={() => "404 NOT FOUND"} />
            </Switch>
        </div>
    );
}

render((<BrowserRouter>
    <App />
</BrowserRouter>), document.getElementById('root'));