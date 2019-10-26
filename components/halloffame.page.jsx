import React from "react";
import axios from 'axios';
import './StyleSheet.css'

export class HallOfFame extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            persons: undefined
        }
        this.goToTheGame= this.goToTheGame.bind(this);
    }

    componentDidMount() {
        axios.get(`/api/highScores`)
            .then(res => {
                const persons = res.data;
                this.setState({ persons });
            })
    }

    goToTheGame(e){
        e.preventDefault();
        this.props.history.push("/game");
    }


    render() {
        if(this.state.persons == undefined){
            return (
                <div>
                    loading
                </div>
            )
        }
        return (
            <main>
                <div>
                    <section className="card">
                        <div>
                            <ol className= "highscore">
                                { this.state.persons.map((person, index) => <li className="highscore" key={index}>{person.userName} : {person.highscore}</li>)}
                            </ol>
                        </div>
                        <button  onClick={this.goToTheGame}>Play</button>
                    </section>
                </div>
            </main>
        )
    }
};
