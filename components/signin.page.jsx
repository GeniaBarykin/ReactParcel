import React,{ useState } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

export const SignIn = props =>  {
    // Declare a new state variable, which we'll call "count"
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        //xmr signIn
    }

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }


    return (
        <div className="SignIn">
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="email" bsSize="large">
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                        autoFocus
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                </FormGroup>
                <Button block bsSize="large" disabled={!validateForm()} type="submit">
                    Sign In
                </Button>
            </form>
        </div>
    );
}


