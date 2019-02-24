import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import './Register.css';
import {register} from '../../services/auth';

class Register extends Component {

  constructor(props){
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      repeatPassword: '',
      redirect: false
    };

    this.toast = props.toast;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    register({
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      repeatPassword: this.state.repeatPassword
    })
      .then(res => {
        if(res.error){
          toast.error(res.error);
          return;
        }

        toast.success(res.message);
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
      <div className="Register">
        {this.state.redirect ? <Redirect to='/login' /> : ''}
        <ToastContainer autoClose={2000} closeButton={false}/>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" value={this.state.username} name="username" onChange={this.handleChange} placeholder="Username" />
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" value={this.state.email} onChange={this.handleChange} placeholder="email@gmail.com" />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="******" />
          <label htmlFor="repeatPassword">Repeat password</label>
          <input type="password" id="repeatPassword" name="repeatPassword" value={this.state.repeatPassword} onChange={this.handleChange} placeholder="******" />
          <input type="submit" value="REGISTER" />
        </form>
      </div>
    );
  }
}

export default Register;
