import React, {Component} from 'react';
import axios from 'axios';
import { withRouter} from "react-router";
import './styleSheet.css'
import userImageSrc from '../img/user.png';
import loading from "../img/loading.gif";

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
                <div className='imageWrap'>
                    <img src={loading}/>
                </div>
            )
        }
        return (
            <div>
                <div id='profileWrapper'>
                    <div className='Wrapper' id='profile' >
                        <h3 id="name">{this.state.user.name}</h3>
                        <div><img src={userImageSrc}></img></div>
                    </div>
                    <div className='buttonPadding'>
                            <button className='buttonOverlay' onClick={this.logout}>Logout</button>
                    </div>
                </div>
                {this.props.children}

            </div>
        )
    }
}

export default withRouter(Auth);
