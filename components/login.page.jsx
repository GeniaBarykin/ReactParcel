import React,{ useState } from 'react';
import axios from 'axios';
import {Redirect} from "react-router";
import './StyleSheet.css'

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
           document.getElementById('warning').innerText = err.response.data.error;
        });
    }


    render() {
        if(localStorage.getItem('secret-key')){
            return (
                <Redirect
                    to={{
                        pathname: "/app",
                        state: {
                            from: this.props.location
                        }
                    }}
                />
            )
        } else {
            return (
                <div>
                    <section className = "card">
                        <form className="loginForm" onSubmit={this.handleSubmit}>
                            <label>
                                <label>Name:</label>
                                <input type="text" id = "userName" className="inputRow" ref={(input) => this.username = input} />

                                <label>Password:</label>
                                <input type="text" id = "password" className="inputRow" ref={(input) => this.password = input} />
                            </label>
                            <button className = "buttonRow" type="submit"> login</button>
                        </form>
                        <h5 id={'warning'}></h5>
                    </section>
                </div>
            );
        }

    }

}