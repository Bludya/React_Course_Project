import React, { Component, lazy, Suspense} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import './App.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer, toast } from 'react-toastify';


import {login, register} from './services/auth';
import Header from './components/Header.js';
const Home = lazy(() => import('./components/Home/Home'));
const Register = lazy(() => import('./components/Register/Register'));
const Login = lazy(() => import('./components/Login/Login'));

const NotFound = lazy(() => import('./components/Error/NotFound'));
// const UnauthorizedPage = lazy(() => import('./components/Error/UnauthorizedPage'));
// const ServerError = lazy(() => import('./components/Error/ServerError'));

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      token: null,
      loggedIn: false,
      isAdmin: false
    }
  }

  componentDidMount = () => {
    this.setState({
      token: window.sessionStorage.token,
      username: window.sessionStorage.username,
      isAdmin: window.sessionStorage.isAdmin
    })
  }

  handleRegister = async (event, data) => {
    event.preventDefault();
    register(data)
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

  handleLogin = async (event, data) => {
    event.preventDefault();
    login(data)
      .then(res => {
        if(res.error){
          toast.error(res.error);
          return;
        }

        toast.success(res.message);

        this.setState({
          token: res.token,
          loggedIn: true,
          isAdmin: res.isAdmin
        })
      })
      .catch(e => {
        console.log(e);
      })
  }

  logout = () => {
    window.sessionStorage.clear();
    this.setState({
      token: null,
      loggedIn: false,
      isAdmin: false
    })

    toast.success('Looged out.');
    return <Redirect to='/' />
  }

  render() {
    return (
      <div className="App">
        <ToastContainer autoClose={2000} position={"top-center"} closeButton={false}/>
        <Router>
          <Suspense fallback={<span>Loading...</span>}>
            <Header loggedIn={this.state.loggedIn}  isAdmin={this.state.isAdmin} />
            <Switch>
              <Route path='/' component={() => <Home fetchMovies={this.fetchMovies}/>} props={this.state.username} exact />
              <Route path='/login'  component={() => this.state.loggedIn ?  <Redirect to='/' />  : <Login toast={toast} handleSubmit={this.handleLogin} />} exact />
              <Route path='/register' component={() => this.state.loggedIn ?  <Redirect to='/' />  : <Register toast={toast} handleSubmit={this.handleRegister} />}  exact />
              <Route path='/logout' component={this.logout} />
              <Route component={() => <NotFound />}/>
            </Switch>
          </Suspense>
        </Router>
      </div>
    );
  }
}

export default App;
