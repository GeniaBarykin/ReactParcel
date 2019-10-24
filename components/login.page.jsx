import React,{ useState } from 'react';
import {urlPostRequest} from "./xhr.functions";


export class Login extends React.Component{
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
        alert('The data is: ' + this.data);
        urlPostRequest("/auth", this.data, true);
        window.location.replace("/login");

    }



    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" ref={(input) => this.username = input} />
                    <input type="text" ref={(input) => this.password = input} />
                </label>
                <input type="submit" value="Login" />
            </form>
        );
    }
}



