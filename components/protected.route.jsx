import React from "react";
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({
                                   component: Component,
                                   ...rest
                               }) => {
    return (
        <Route
            {...rest}
            render={props => {
                //check auth
                if (1==2) {
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
};