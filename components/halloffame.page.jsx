import React from "react";
import axios from 'axios';
//import './StyleSheet.css'
import loading from "../img/loading.gif";
import stage1 from "../img/stage1.png";
import stage3 from "../img/stage3.png";
import stage2 from "../img/stage2.png";


export class HallOfFame extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            persons: undefined,
            user: undefined
        }
        this.goToTheGame= this.goToTheGame.bind(this);
    }

    componentDidMount() {
        const  jwt=localStorage.getItem('secret-key');
        axios.get(`/api/highScores`,{headers: {Authorization: 'Bearer '+jwt}})
            .then(res => {
                const list = res.data.list;
                const user = res.data.currentUser;
                this.setState({
                    persons: list,
                    user:  user
                });
            })
    }

    goToTheGame(e){
        e.preventDefault();
        this.props.history.push("/game");
    }


    render() {
        if(this.state.persons == undefined){
            return (
                <div className='imageWrap'>
                    <img src={loading}/>
                </div>
            )
        }
        return (
            <main>
                <div>
                    <section className="card" id='listWrapper'>
                        <div className='buttonPadding'>
                            <h1 className='rainbow'>Hall of fame</h1>
                        </div>
                        <div>
                            <ul id="orderedList" className= "highscore">
                                { this.state.persons.map((person, index) =>
                                    <li value={person.highscore} id={ this.state.user == person.userName ? 'currentUser'
                                    : index}
                                        className="highscore" key={index}>{person.userName} : {person.highscore}</li>)}
                            </ul>
                        </div>
                        <div className='buttonPadding'>
                              <button className='transitionButt'   onClick={this.goToTheGame}>Play</button>
                        </div>
                    </section>
                </div>
            </main>
        )
    }
};
