import React, {Component} from 'react';
import {getUnapprovedQuestions, getHiddenAnswers, approveQuestionService} from '../../services/questions';
import {getUsersService, userBanService, makeAdminService} from '../../services/auth';

import Question from '../Entities/Question';
import UserInfo from '../Entities/UserInfo';
import AdminPanelList from './AdminPanelList';

class AdminPanel extends Component {
  constructor(props){
    super(props);

    this.state = {
      location: '',
      entities: []
    }

    this.getUsers = this.getUsers.bind(this);
    this.userBan = this.userBan.bind(this);
    this.makeAdmin = this.makeAdmin.bind(this);
    this.showUnapprovedQuesions = this.showUnapprovedQuesions.bind(this);
    this.approveQuestion = this.approveQuestion.bind(this);
  }

  componentDidMount() {
    this.showUnapprovedQuesions();
  }

  approveQuestion = (id) => {
    approveQuestionService(id)
      .then(() => {
        this.showUnapprovedQuesions();
      })
  }

  showUnapprovedQuesions = () => {
    getUnapprovedQuestions()
      .then(questions => {
        this.setState({
          location: 'unapprovedQuestions',
          entities: questions
        })
      })
  }

  getUsers = () => {
    getUsersService()
      .then(users => {
        this.setState({
          location: 'usersList',
          entities: users
        })
      })
  }

  userBan = (id, banState) => {
    userBanService(id, banState)
      .then(() => {
        this.getUsers();
      })
  }

  makeAdmin = (id) => {
    makeAdminService(id)
      .then(() => {
        this.getUsers();
      })
  }

  render(){
    return(
      <div className="profile">
        <aside>
          <ul>
            <li onClick={this.showUnapprovedQuesions}>Unapproved Questions</li>
            <li onClick={this.getUsers}>List Users</li>
          </ul>
        </aside>
        <main>
          {this.state.location === 'unapprovedQuestions' ? <AdminPanelList entityType={"question"} functions={{approveQuestion: this.approveQuestion}} entities={this.state.entities} component={Question} /> : ''}
          {this.state.location === 'usersList' ? <AdminPanelList entityType="userInfo" functions={{userBan: this.userBan, makeAdmin: this.makeAdmin}} entities={this.state.entities} component={UserInfo} /> : ''}
        </main>
      </div>
    )
  }
}

export default AdminPanel;
