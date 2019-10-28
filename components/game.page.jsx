import React from "react";
import axios from 'axios';
import './styleSheet.css'
import stage1 from '../img/stage1.png';
import stage2 from '../img/stage2.png';
import stage3 from '../img/stage3.png';
import loading from '../img/loading.gif';

export class AppLayout extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            user: undefined,
            score: undefined,
            stage: 1
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

    clickedButton(){
        let currentStage =  this.state.stage;
        currentStage++;
        if(currentStage>4){
            currentStage=1;
        }
        this.setState({
            score: this.state.score+1,
            stage: currentStage
        });
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
                <div className='imageWrap'>
                    <img src={loading}/>
                </div>
            )
        }
        let source = "";
        { this.state.stage==1 ?source=stage1
                : this.state.stage==3 ? source=stage3
                : source=stage2
        }
        return (
            <main>
                <div id='gameLayout'>
                    <section  className="card checked">
                        <div className="inputRow">
                            <h1  className="rainbow">Click-the-button!</h1>
                        </div>
                        <div className='imageWrap'>
                            <img src={source}/>
                        </div>
                        <div className="clicker">
                            <button id='clickerButton' value={this.state.score} onClick={this.clickedButton}>{this.state.score}</button>
                        </div>
                        <div className='buttonPadding' id='backToHall'>
                            <button className='transitionButt'  onClick={this.goToTheHall}>Hall of Fame</button>
                        </div>
                    </section>

                </div>
            </main>
        )
    }
};
