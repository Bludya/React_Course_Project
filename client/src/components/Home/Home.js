import React, { Component } from 'react';
import {getRandomQuestion} from '../../services/questions';
import './Home.css'


class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      question: ''
    }
  }

  componentDidMount = async () => {
    getRandomQuestion()
    .then(res => {
      this.setState({question: res})
    })
  }

  render() {
    return (
      <div className="Home">
        <div className="Question">
          <h1>{this.state.question? this.state.question.text : ''}</h1>
        </div>
      </div>
    );
  }
}

export default Home;
