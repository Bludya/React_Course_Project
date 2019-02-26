import React, { Component } from 'react';
import './Register.css';

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
  }


  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div className="Register">
        <h1 className='text-center'>Register</h1>
        <form onSubmit={(event) => this.props.handleSubmit(event, this.state)}>
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
