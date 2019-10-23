import React from 'react';
import { render } from 'react-dom';
import { ProtectedRoute } from "./components/protected.route";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import {Unauthorized} from "./components/unauthorized.page";
import {AppLayout} from "./components/app.page";
import {Login} from "./components/login.page";
import {SignIn} from "./components/signin.page";


function App() {
    return (
        <div className="App">
            <Switch>
                <Route exact path="/" component={Unauthorized} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signin" component={SignIn} />
                <ProtectedRoute exact path="/app" component={AppLayout}/>
                <Route path="*" component={() => "404 NOT FOUND"} />
            </Switch>
        </div>
    );
}

render((<BrowserRouter>
    <App />
</BrowserRouter>), document.getElementById('root'));