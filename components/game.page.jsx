import React from "react";
import axios from 'axios';
import './StyleSheet.css'
let userName = undefined;

export class AppLayout extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            user: undefined,
            score: undefined
        }
        this.clickedButton = this.clickedButton.bind(this);
        this.goToTheHall = this.goToTheHall.bind(this);
    }

    componentDidMount() {
        const  jwt=localStorage.getItem('secret-key');
        axios.get(`/api/highScores/myscore`, {headers: {Authorization: 'Bearer '+jwt}})
            .then(res => {
                const score = res.data.highscore;
                this.setState({ score: score,
                    user: res.data.userName});
            }).catch(err => {
                localStorage.removeItem('secret-key');
                window.location="/";
            })
    }

    componentWillUnmount() {
    }

    clickedButton(){
        this.setState({score: this.state.score+1});
        const  jwt=localStorage.getItem('secret-key');
        axios.put('/api/highScores', {}, {headers: {Authorization: 'Bearer '+jwt}}).catch(err => {
           alert(err);
        });
    }

    goToTheHall(e){
        e.preventDefault()
        this.props.history.push("/hall")
    }

    render() {
        if(this.state.score===undefined){
            return (
                <div>
                    loading
                </div>
            )
        }

        return (
            <main>
                <div>
                    <section className="card checked">
                        <div className="inputRow">
                            <h1>Click-the-button!</h1>
                        </div>
                        <div className="clicker">
                            <button id='clickerButton' onClick={this.clickedButton}>{this.state.score}</button>
                        </div>
                    </section>
                    <div>
                        <button id='backToHall'  onClick={this.goToTheHall}>Hall of Fame</button>
                    </div>
                </div>
            </main>
        )
    }
};
