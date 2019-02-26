import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'
import './Login.css';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      redirect: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = props.handleSubmit.bind(this);
  }


  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div className="Login">
        <h1 className='text-center'>Login</h1>
        <form onSubmit={(event)=>this.handleSubmit(event, this.state)}>
          <label htmlFor="usernameLogin">Username</label>
          <input type="text" id="usernameLogin" value={this.state.username} onChange={this.handleChange} name="username" placeholder="Username"/>
          <label htmlFor="passwordLogin">Password</label>
          <input type="password" id="passwordLogin" value={this.state.password} onChange={this.handleChange} name="password" placeholder="******"/>
          <input type="submit" value="Login"/>
          <span>
            <p>or</p>
            <NavLink  exact to="/register">Register</NavLink>
          </span>
        </form>
      </div>
    );
  }
}

export default Login;
