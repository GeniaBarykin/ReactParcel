import React from "react";
import axios from 'axios';
import './StyleSheet.css'
let clickCounter = 0;

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

    componentWillUnmount() {
    }

    clickedButton(){
        clickCounter++;
        document.getElementById('clickerButton').innerHTML = clickCounter;
    }

    render() {
        return (
            <main>
                <div>
                    <section className="card checked">
                        <div className="inputRow">
                            <h1>Click-the-button!</h1>
                        </div>
                        <div className="clicker">
                            <button id='clickerButton' onClick={this.clickedButton}>0</button>
                        </div>
                    </section>

                    <section className="card">
                        <div>
                            <ol className= "highscore">
                                { this.state.persons.map((person, index) => <li className="highscore" key={index}>{person.userName} : {person.highscore}</li>)}
                            </ol>
                        </div>
                    </section>
                </div>
            </main>
        )
    }
};
