import React, {Component} from 'react';
import {getQuestionsByUser, getAnswersByUser} from '../../services/questions';

import Question from '../Question/Question';
import Answer from '../Answer/Answer';
import ProfileList from './ProfileList';

class Profile extends Component {
  constructor(props){
    super(props);

    this.state = {
      location: 'questions',
      entities: []
    }

    this.showQuestions = this.showQuestions.bind(this);
    this.showAnswers = this.showAnswers.bind(this);
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

  render(){
    return(
      <div className="profile">
        <aside>
          <span onClick={this.showQuestions}>My Questions</span>
          <span onClick={this.showAnswers}>My Answers</span>
        </aside>
        <main>
          {this.state.location === 'questions' ? <ProfileList entities={this.state.entities} component={Question}/> : ''}
          {this.state.location === 'answers' ? <ProfileList entities={this.state.entities} component={Answer}/> : ''}
        </main>
      </div>
    )
  }
}

export default Profile;
