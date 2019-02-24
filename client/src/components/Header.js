import React from 'react';
import {Link, NavLink} from 'react-router-dom';

let Header = (props) =>{
  return (
    <header>
      <Link to="/" className="logo" >AskAway</Link>
      <div className="header-right">
        <NavLink exact to="/">Home</NavLink>
          {props.username ?
            (<span>
              <NavLink exact to="#">Welcome {props.username}!</NavLink>
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
