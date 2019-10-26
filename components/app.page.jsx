import React from "react";
import axios from 'axios';
import './StyleSheet.css'
let clickCounter = 0;
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
        axios.get("/api/auth/check", {headers: {Authorization: 'Bearer '+jwt}}).then(
            res => {
                this.setState({user: res.data}),
                userName = res.data.name
                axios.get(`/api/highScores/`+ userName)
                    .then(res => {
                        const score = res.data.highscore;
                        this.setState({ score: score});
                    })
            }
            ).catch(err => {
            localStorage.removeItem('secret-key');
            window.location="/";
        })
    }

    componentWillUnmount() {
    }

    clickedButton(){
        this.setState({score: this.state.score+1});
        let data = {
            name: userName
        };
        axios.post('/api/highScores', data).catch(err => {
           alert(err);
        });
    }

    goToTheHall(e){
        e.preventDefault()
        this.props.history.push("/app")
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
                        <button  onClick={this.goToTheHall}>Hall of Fame</button>
                    </div>
                </div>
            </main>
        )
    }
};
