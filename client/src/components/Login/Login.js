import React, { Component } from 'react';
import {NavLink, Redirect} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import './Login.css';

import {login} from '../../services/auth';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      redirect: false
    }

    this.toast = props.toast;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    login({
      username: this.state.username,
      password: this.state.password
    })
      .then(res => {
        if(res.error){
          toast.error(res.error);
          return;
        }

        toast.success(res.message);
        window.sessionStorage.token = res.token;
        this.setState({redirect: true})
      })
      .catch(e => {
        console.log(e);
      })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div className="Login">
        {this.state.redirect ? <Redirect to='/' /> : ''}
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="usernameLogin">Username</label>
          <input type="text" id="usernameLogin" value={this.state.username} onChange={this.handleChange} name="username" placeholder="Username"/>
          <label htmlFor="passwordLogin">Password</label>
          <input type="password" id="passwordLogin" value={this.state.password} onChange={this.handleChange} name="password" placeholder="******"/>
          <input type="submit" value="Login"/>
          <span className='register'>
            <p>or</p>
            <NavLink  exact to="/register">Register</NavLink>
          </span>
        </form>
      </div>
    );
  }
}

export default Login;
