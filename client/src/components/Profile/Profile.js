import React, {Component} from 'react';
import {postQuestion, getQuestionsByUser, getAnswersByUser} from '../../services/questions';

import Question from '../Question/Question';
import Answer from '../Answer/Answer';
import ProfileList from './ProfileList';
import AddQuestion from './AddQuestion';

class Profile extends Component {
  constructor(props){
    super(props);

    this.state = {
      location: 'addQuestion',
      entities: []
    }

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
    console.log(tags);
    let text = data.text;
    console.log('Texts is: ' + text);

    postQuestion(tags, text)
      .then(q =>{
        console.log(q);
      })
  }

  render(){
    return(
      <div className="profile">
        <aside>
          <ul>
            <li onClick={() => this.setState({location: 'addQuestion'})}>Add Question</li>
            <li onClick={this.showQuestions}>My Questions</li>
            <li onClick={this.showAnswers}>My Answers</li>
          </ul>
        </aside>
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
