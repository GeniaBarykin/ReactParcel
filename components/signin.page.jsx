import React,{ useState } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import {urlPostRequest} from "./xhr.functions";

export class SignIn extends React.Component{
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.data = {
            username:this.username.value,
            password:this.password.value
        };
        alert('The data is: ' + JSON.stringify(this.data));
        urlPostRequest("/auth/new", this.data, true);
        window.location.replace("/");
    }



    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" ref={(input) => this.username = input} />
                    <input type="text" ref={(input) => this.password = input} />
                </label>
                <input type="submit" value="Create user" />
            </form>
        );
    }
}


