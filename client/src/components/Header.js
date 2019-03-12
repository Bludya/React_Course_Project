import React from 'react';
import {Link, NavLink} from 'react-router-dom';

let Header = (props) =>{
  return (
    <header className="container">
      <Link to="/" className="logo " >AskAway</Link>
      <div className="header-right">
        <NavLink exact to="/">Home</NavLink>
        {props.loggedIn ?
          (<span>
            <NavLink exact to="/profile">My Profile</NavLink>
            {props.isAdmin ?
              (<NavLink exact to="/admin-panel">Admin Panel</NavLink>) : ('')
            }
            <NavLink exact to="/logout">Logout</NavLink>
          </span>
          ) :
          (
            <span>
              <NavLink exact to="/login">Login</NavLink>
            </span>
          )
        }
      </div>
    </header>
  )
}

export default Header;
