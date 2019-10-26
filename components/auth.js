import React, {Component} from 'react';
import axios from 'axios';
import { withRouter} from "react-router";
import './StyleSheet.css'

export class Auth extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            user: undefined
        }
    }

    componentDidMount() {
        const  jwt=localStorage.getItem('secret-key');
        if(!jwt){
            window.location="/";
        }
        axios.get("/api/auth/check", {headers: {Authorization: 'Bearer '+jwt}}).then(res => this.setState({
            user: res.data
        })).catch(err => {
            localStorage.removeItem('secret-key');
            window.location="/";
        })
    }

    logout(){
        localStorage.removeItem("secret-key");
        window.location="/";
    }

    render() {
        if(this.state.user == undefined){
            return (
                <div>
                   loading
                </div>
            )
        }
        return (
            <div>
                <div>
                    <h2>Hello {this.state.user.name}</h2>
                    <button onClick={this.logout}>Logout</button>
                </div>
                {this.props.children}

            </div>
        )
    }
}

export default withRouter(Auth);
