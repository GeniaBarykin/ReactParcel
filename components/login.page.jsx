import React,{ useState } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

export const Login = props =>  {
    // Declare a new state variable, which we'll call "count"
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        //xmr login
    }

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }


    return (LoginForm);
}

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: ""
        }
        this.clickHandler = this.clickHandler.bind(this)
        this.setUsername = this.setUsername.bind(this)
        this.setPassword = this.setPassword.bind(this)
    }
}


