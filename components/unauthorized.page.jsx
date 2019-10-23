import React from "react";
import auth from "./auth";

export const Unauthorized = props => {
    return (
        <div>
            <h1>Landing Page</h1>
            <button
                onClick={() => {
                    auth.login(() => {
                        window.location.replace("/login");
                    });
                }}
            >
                Login
            </button>
            <button
                onClick={() => {
                    auth.login(() => {
                        window.location.replace("/signin");
                    });
                }}
            >
                Sign in
            </button>
        </div>
    );
};