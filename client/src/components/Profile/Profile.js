import React, {Component} from 'react';
import {postQuestion, getQuestionsByUser, getAnswersByUser} from '../../services/questions';

import Question from '../Entities/Question';
import Answer from '../Entities/Answer';
import ProfileList from './ProfileList';
import AddQuestion from './AddQuestion';
import AsideNav from '../AsideNav';

import './Profile.css';

class Profile extends Component {
  constructor(props){
    super(props);

    this.state = {
      location: 'addQuestion',
      entities: []
    }

    this.toastAlert = props.toastAlert;
    this.showQuestions = this.showQuestions.bind(this);
    this.showAnswers = this.showAnswers.bind(this);
    this.handleQuesionSubmit = this.handleQuesionSubmit.bind(this);
  }

  showQuestions = () => {
    getQuestionsByUser()
      .then(questions => {
        this.setState({
          location: 'questions',
          entities: questions
        })
      })
  }

  showAnswers = () => {
    getAnswersByUser()
      .then(answers => {
        this.setState({
          location: 'answers',
          entities: answers
        })
      })
  }

  handleQuesionSubmit = (event, data) => {
    event.preventDefault();
    let tags = data.tags.split(' ').map(tag => tag.trim());
    let text = data.text;

    postQuestion(tags, text)
      .then(res =>{
        this.toastAlert(res);
        this.showQuestions();
      })
  }

  render(){
    let asideNavLinks= [
      {text: 'Add Question', onClick: () => this.setState({location: 'addQuestion'})},
      {text: 'My Questions', onClick: this.showQuestions},
      {text: 'My Answers', onClick: this.showAnswers}
    ]

    return(
      <div className="profile row">
        <AsideNav elementsData={asideNavLinks} />
        <main>
          {this.state.location === 'addQuestion' ? <AddQuestion handleQuesionSubmit={this.handleQuesionSubmit}/> : ''}
          {this.state.location === 'questions' ? <ProfileList entities={this.state.entities} component={Question}/> : ''}
          {this.state.location === 'answers' ? <ProfileList entities={this.state.entities} component={Answer}/> : ''}
        </main>
      </div>
    )
  }
}

export default Profile;
