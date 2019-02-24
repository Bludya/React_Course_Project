import React, { Component, lazy, Suspense} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer, toast } from 'react-toastify';


import Header from './components/Header.js';
const Home = lazy(() => import('./components/Home/Home'));
const Register = lazy(() => import('./components/Register/Register'));
const Login = lazy(() => import('./components/Login/Login'));

const NotFound = lazy(() => import('./components/Error/NotFound'));
// const UnauthorizedPage = lazy(() => import('./components/Error/UnauthorizedPage'));
// const ServerError = lazy(() => import('./components/Error/ServerError'));

const serverPath = 'http://localhost:9999';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      username: null,
      isAdmin: false
    }
  }

  render() {
    return (
      <div className="App">
        <ToastContainer autoClose={2000} position={"top-center"} closeButton={false}/>
        <Router>
          <Suspense fallback={<span>Loading...</span>}>
            <Header username={this.state.username}  isAdmin={this.state.isAdmin} />
            <Switch>
              <Route path='/' component={() => <Home fetchMovies={this.fetchMovies}/>} props={this.state.username} exact />
              <Route path='/login'  component={() => <Login toast={toast}  />} exact />
              <Route path='/register' component={() => <Register toast={toast} />}  exact />
              <Route component={() => <NotFound />}/>
            </Switch>
          </Suspense>
        </Router>
      </div>
    );
  }
}

export default App;
