import React from "react";
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({
                                   component: Component,
                                   ...rest
                               }) => {
    let auth = [];
    let xhr = new XMLHttpRequest();
    alert("1");
    xhr.responseType = "json";
    xhr.open("GET", "/api/auth/check", false);
    xhr.onload = () => {
        let json = xhr.response;
        auth=json.authorized;
        alert("2" + auth);
        render()
        {
            return (
                <Route
                    {...rest}
                    render={props => {
                        //check auth
                        if (auth) {
                            return <Component {...props} />;
                        } else {
                            window.location.replace("/");
                            return (
                                <Redirect
                                    to={{
                                        pathname: "/",
                                        state: {
                                            from: props.location
                                        }
                                    }}
                                />
                            );
                        }
                    }}
                />
            );
        }
    };
    xhr.send();


};