import React, { Component, Fragment } from 'react';
import {
  getRandomQuestion,
  postAnswer,
  deleteAnswer,
  getAnswers,
  rateAnswer,
  rateQuestion
} from '../../services/questions';

import './Home.css';
import Question from '../Entities/Question';
import Answer from '../Entities/Answer';
import AnswerForm from './AnswerForm';
import QuestionButtons from './QuestionButtons';

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
      isAdmin: props.isAdmin
    }

    this.getQuestion = this.getQuestion.bind(this);
    this.postAnswer = this.postAnswer.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.showAnswers = this.showAnswers.bind(this);
    this.showAnswerForm = this.showAnswerForm.bind(this);
    this.deleteAnswerMethod = this.deleteAnswerMethod.bind(this);
    this.rateAnswerMethod = this.rateAnswerMethod.bind(this);
    this.rateQuestionMethod = this.rateQuestionMethod.bind(this);
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

  showAnswerForm = () => this.setState({showAnswerForm: !this.state.showAnswerForm});

  loadAnswers = async () => {
    getAnswers(this.state.question._id)
      .then(answers => {
        this.setState({answers});
      })
  }

  rateAnswerMethod = (answerId, rating) => {
    if(window.sessionStorage.token && answerId && rating){
      rateAnswer(answerId, rating)
        .then(a => {
          if(this.state.showAnswers){
            this.loadAnswers();
          }
        })
    }
  }

  rateQuestionMethod = (rating) => {
    const questionId = this.state.question._id;
    if(window.sessionStorage.token && questionId && rating){
      rateQuestion(questionId, rating)
        .then(res => {
            this.setState({question: res.question})
        })
    }
  }

  render() {
    return (
      <div className="Home d-flex flex-column">
        <div className="tag-input-group row input-group justify-content-center">
          <label forhtml="tag-input">#</label>
          <input type="text" id="tag-input" className="tag-input" value={this.state.tag} name="tag" onChange={this.handleChange} placeholder="tag"/>
        </div>
        <div className="d-flex flex-column justify-content-center">
          {this.state.question ? (
            <Fragment>
              <div className="question-holder">
                <Question entity={this.state.question} getQuestionMethod={this.getQuestion} rateQuestionMethod={this.rateQuestionMethod} message={this.state.message}/>
              </div>
              <QuestionButtons thumbsUp={this.state.question.ups.length} thumbsDown={this.state.question.downs.length} showAnswers={this.showAnswers} showAnswerForm={this.showAnswerForm} rateQuestionMethod={this.rateQuestionMethod}/>
              { this.state.showAnswerForm ?
                (<div className="answer-form row">
                  <AnswerForm questionId = {this.state.question._id} submitHandler={this.postAnswer}/>
                </div>) : ''
              }
              {
                this.state.showAnswers ?
                (<div className="answers justify-content-center">
                  {this.state.answers.map(a => <Answer isAdmin={this.state.isAdmin} rateAnswerMethod={this.rateAnswerMethod} deleteAnswerMethod={this.deleteAnswerMethod} entity={a} key={a._id}/>)}
                </div>) : ''
              }

            </Fragment>) :
            (
              <div className="question-holder row justify-content-center " onClick={this.getQuestion}>
                <h1 className="question">{this.state.message}</h1>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default Home;
