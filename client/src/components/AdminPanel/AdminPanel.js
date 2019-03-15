import React, {Component, Fragment} from 'react';
import {getUnapprovedQuestions, approveQuestionService} from '../../services/questions';
import {getUsersService, userBanService, makeAdminService, getUsersByUsernameService} from '../../services/auth';

import Question from '../Entities/Question';
import UserInfo from '../Entities/UserInfo';
import AsideNav from '../AsideNav';
import QuestionButtons from './QuestionButtons';
import UserButtons from './UserButtons';
import './AdminPanel.css';

class AdminPanel extends Component {
  constructor(props){
    super(props);

    this.state = {
      location: '',
      entities: [],
      searchUsername: ''
    }

    this.toastAlert = props.toastAlert;
    this.getUsers = this.getUsers.bind(this);
    this.userBan = this.userBan.bind(this);
    this.makeAdmin = this.makeAdmin.bind(this);
    this.showUnapprovedQuesions = this.showUnapprovedQuesions.bind(this);
    this.approveQuestion = this.approveQuestion.bind(this);
    this.handleUsernameSearch = this.handleUsernameSearch.bind(this);
  }

  handleUsernameSearch = (event) => {
    let searchString = event.target.value
    console.log(searchString);
    this.setState({searchUsername: searchString});
    getUsersByUsernameService(searchString)
      .then(users =>
        this.setState({
          entities: users
        })
      )
  }

  componentDidMount() {
    this.showUnapprovedQuesions();
  }

  approveQuestion = (id) => {
    approveQuestionService(id)
      .then((res) => {
        this.toastAlert(res);
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
      .then((res) => {
        this.toastAlert(res);
        this.getUsers();
      })
  }

  makeAdmin = (id) => {
    makeAdminService(id)
      .then((res) => {
        this.toastAlert(res);
        this.getUsers();
      })
  }

  render(){
    let asideNavLinks= [
      {text: 'Unapproved Questions', onClick: this.showUnapprovedQuesions},
      {text: 'List Users', onClick: this.getUsers}
    ]

    return(
      <div className="admin-panel row">
        <AsideNav elementsData={asideNavLinks} />
        <main className="col-xl-9">
          { this.state.location === 'unapprovedQuestions' ?
            (this.state.entities.map(e =>
              <Question
                key={e._id}
                entity={e}
                addOnComponent={<QuestionButtons approveQuestion={this.approveQuestion} id={e._id}/>}
              />)
            ) : ''
          }
          { this.state.location === 'usersList' ?
            (
              <Fragment>
                <div className="username-search ">
                  <input
                    type="text"
                    name="searchUsername"
                    value={this.state.searchUsername}
                    onChange={this.handleUsernameSearch}
                    placeholder="username"/>
                </div>
                {this.state.entities.map(e =>
                  <UserInfo
                    key={e._id}
                    entity={e}
                    addOnComponent={<UserButtons userBan={this.userBan} makeAdmin={this.makeAdmin} id={e._id} banned={e.banned}/>}
                  />)
                }
              </Fragment>
            ) : ''
          }
        </main>
      </div>
    )
  }
}

export default AdminPanel;
