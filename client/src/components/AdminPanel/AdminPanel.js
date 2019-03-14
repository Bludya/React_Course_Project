import React, {Component, Fragment} from 'react';
import {getUnapprovedQuestions, approveQuestionService} from '../../services/questions';
import {getUsersService, userBanService, makeAdminService, getUsersByUsernameService} from '../../services/auth';

import Question from '../Entities/Question';
import UserInfo from '../Entities/UserInfo';
import AdminPanelList from './AdminPanelList';

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
    return(
      <div className="profile">
        <aside>
          <ul>
            <li onClick={this.showUnapprovedQuesions}>Unapproved Questions</li>
            <li onClick={this.getUsers}>List Users</li>
          </ul>
        </aside>
        <main>
          {
            this.state.location === 'unapprovedQuestions' ?
            <AdminPanelList
              entityType={"question"}
              functions={{approveQuestion: this.approveQuestion}}
              entities={this.state.entities}
              component={Question}
            /> : ''
          }
          {
            this.state.location === 'usersList' ?
            (
              <Fragment>
              <div className="tag-input-group row input-group justify-content-center">
                <label forhtml="searchUsername">Username: </label>
                <input type="text" name="searchUsername" value={this.state.searchUsername} onChange={this.handleUsernameSearch} placeholder="username"/>
              </div>
                <AdminPanelList entityType="userInfo" functions={{userBan: this.userBan, makeAdmin: this.makeAdmin}} entities={this.state.entities} component={UserInfo} />
              </Fragment>
            ) : ''
          }
        </main>
      </div>
    )
  }
}

export default AdminPanel;
