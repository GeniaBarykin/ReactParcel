import React from "react";
export const Unauthorized = props => {
    return (
        <div>
            <h1>Unauthorized</h1>
            <button
                onClick={() => {
                        window.location=("/login");
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