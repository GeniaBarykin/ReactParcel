import React,{ useState } from 'react';
import axios from 'axios';

export class Login extends React.Component{
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.data = {
            name:this.username.value,
            password:this.password.value
        };
        axios.post('/api/auth', this.data).then(res => {
            localStorage.setItem("secret-key", res.data.token);
            this.props.history.push("/app");
        }).catch(err => {
           document.getElementById('warning').innerText="Password do not match";
        });
    }


    render() {
        return (
            <div>
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" ref={(input) => this.username = input} />
                    <input type="text" ref={(input) => this.password = input} />
                </label>
                <input type="submit" value="Login" />
            </form>
                <h5 id={'warning'}></h5>
            </div>
        );
    }
}