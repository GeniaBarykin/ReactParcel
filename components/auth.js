import React, {Component} from 'react';
import axios from 'axios';
import { withRouter} from "react-router";
import {getJwt} from "./helpers/jwt";

export class Auth extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            user: undefined
        }
    }

    componentDidMount() {
        const  jwt=getJwt();
        if(!jwt){
            window.location="/";
        }
        axios.get("/api/auth/check", {headers: {Authorization: 'Bearer '+jwt}}).then(res => this.setState({
            user: res.data
        })).catch(err => {
            alert(err);
            window.location="/";
        })
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
                <h3>Hello {this.state.user.name}</h3>
                {this.props.children}
            </div>
        )
    }
}

export default withRouter(Auth);
