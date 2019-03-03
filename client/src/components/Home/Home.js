import React, { Component, Fragment } from 'react';
import {getRandomQuestion, postAnswer, deleteAnswer, getAnswers} from '../../services/questions';
import './Home.css';
import Question from '../Question/Question';
import Answer from '../Answer/Answer';
import AnswerForm from './AnswerForm';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      question: '',
      answers: [],
      tag:'',
      message:'Click here for a question.',
      showAnswers: false,
      showAnswerForm: false,
    }

    this.toast = props.toast.bind(this);
    this.getQuestion = this.getQuestion.bind(this);
    this.postAnswer = this.postAnswer.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteAnswerMethod = this.deleteAnswerMethod.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  getQuestion = (e) => {
    getRandomQuestion(this.state.tag)
    .then(res => {
        let question = res.question;
        this.setState({answers: []});

        if(this.state.showAnswers){
          getAnswers(question._id)
            .then(answers => {
              this.setState({
                answers,
                question,
                message: res.message
              });
              return;
            })
        }

        this.setState({
          question,
          message: res.message
        })
    })
  }

  postAnswer = (event, data) => {
    event.preventDefault();
    const text = event.target[0].value;

    postAnswer(text, this.state.question._id)
      .then(res => {
        this.setState({showAnswerForm: false});

        if(this.state.showAnswers){
          this.loadAnswers();
        }
      });
  }

  deleteAnswerMethod = (answerId) => {
    deleteAnswer(answerId)
      .then(res => {
        console.log(res);
        if(this.state.showAnswers){
          this.loadAnswers();
        }
      })
  }

  showAnswers = () => {
    let stateChange = {
      showAnswers: !this.state.showAnswers
    };

    if(!this.state.showAnswers){
      this.loadAnswers();
    }

    this.setState(stateChange);
  }

  loadAnswers = async () => {
    getAnswers(this.state.question._id)
      .then(answers => {
        this.setState({answers});
      })
  }

  render() {
    return (
      <div className="Home d-flex flex-column">
        <div className="tag-input-group row input-group justify-content-center">
          <label forhtml="tag-input">#</label>
          <input type="text" id="tag-input" className="tag-input" value={this.state.tag} name="tag" onChange={this.handleChange} placeholder="tag"/>
        </div>
        <div className="d-flex flex-column justify-content-center">
          <div className="row question-holder justify-content-center" onClick={this.getQuestion} >
            <Question entity={this.state.question} message={this.state.message}/>
          </div>
          {this.state.question ? (
            <Fragment>
              <div id="buttons-container" className="flex-d justify-content-center">
                <span className="button"
                      id="show-answer-form"
                      onClick={() => this.setState({showAnswerForm: !this.state.showAnswerForm})}>
                  <i className="fa fa-comment" aria-hidden="true"></i>
                </span>
                <span className="button"
                      id="show-answers"
                      onClick={this.showAnswers}>
                  <i className="fa fa-comments" aria-hidden="true"></i>
                </span>
              </div>
              { this.state.showAnswerForm ?
                (<div className="answer-form row">
                  <AnswerForm questionId = {this.state.question._id} submitHandler={this.postAnswer}/>
                </div>) : ''
              }
              {
                this.state.showAnswers ?
                (<div className="answers justify-content-center">
                  {this.state.answers.map(a => <Answer deleteAnswerMethod={this.deleteAnswerMethod} entity={a} key={a._id}/>)}
                </div>) : ''
              }

            </Fragment>) : ''
          }
        </div>
      </div>
    );
  }
}

export default Home;
