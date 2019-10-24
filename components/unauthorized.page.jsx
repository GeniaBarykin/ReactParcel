import React from "react";
import auth from "./auth";

export const Unauthorized = props => {
    return (
        <div>
            <h1>Unauthorized</h1>
            <button
                onClick={() => {
                        window.location.replace("/login");
                }}
            >
                Login
            </button>
            <button
                onClick={() => {
                        window.location=("/signin");
                }}
            >
                Sign in
            </button>
        </div>
    );
};