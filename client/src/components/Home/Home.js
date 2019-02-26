import React, { Component, Fragment } from 'react';
import {getRandomQuestion} from '../../services/questions';
import './Home.css';

let ANONYMOUS_PROFILE_PICTURE = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcAueZnclibCzt5r71j_FccR1aXNE5J3aDwxkK9zIWvorx7LpIFw';

let Question = (props) =>(
  <div className="flex-column question">
    {props.question ? (
      <Fragment>
        <h1>{props.question.text}</h1>
        <div className="tags">
          {
            props.question.tags ?
            props.question.tags.map(t => <span key={t._id} id="tag">#{t.name}</span>) : '#'}
        </div>
        <div className="author">By: {props.question.author ? props.question.author.username : 'Anonymous'}
        </div>

        <div className="answers">
          {props.question.answers.map(a => <Answer answer={a}/>)}
        </div>
      </Fragment>) :
      (<h1 className="question">{props.message}</h1>)
    }
  </div>)


let Answer = (props) =>(
  <div className="answer">
    <img src={props.answer.author? props.answer.author.profilePicture : anonymousProfilePicture}
    <h1>{props.answer.text}</h1>
    <div className="author">By: {props.answer.author ? props.answer.author.username : 'Anonymous'}
  </div>
)

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      question: '',
      tag:'',
      message:'Click here for a question.'
    }

    this.getQuestion = this.getQuestion.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  getQuestion = async (e) => {
    getRandomQuestion(this.state.tag)
    .then(res => {
        this.setState({
          question: res.question,
          message: res.message
        })
    })
  }

  render() {
    return (
      <div className="Home">
        <div class="tag-input-group input-group d-flex justify-content-center">
          <label for="tag-input">#</label>
          <input type="text" id="tag-input" className="tag-input" value={this.state.tag} name="tag" onChange={this.handleChange} placeHolder="tag"/>
        </div>
        <div className="d-flex justify-content-center" onClick={this.getQuestion}>
          <Question question={this.state.question} message={this.state.message}/>
        </div>
      </div>
    );
  }
}

export default Home;
