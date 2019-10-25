import React from "react";
import axios from 'axios';

export class AppLayout extends React.Component{
    constructor(props) {
        super(props)
        this.state = {persons: [] }
    }

    componentDidMount() {
        axios.get(`/api/highScores`)
            .then(res => {
                const persons = res.data;
                this.setState({ persons });
            })
    }

    render() {
        return (
            <ul>
                { this.state.persons.map((person, index) => <li key={index}>{person.userName} {person.highscore}</li>)}
            </ul>
        )
    }
};
