import React from 'react';
import './UserInfo.css';

const UserInfo = (props) => {
  const user = props.entity;
  return(
    <div className="user-info row">
      <div className="col-xl-8">
        <span clsssName="username">Username: {user.username}</span>
        <span clsssName="roles">Role: {user.roles.map(role => role+' ')}</span>
        {
          user.banned ?
          (<span className="ban-text">BANNED</span>) : ''
        }
      </div>
      {props.addOnComponent}
    </div>
  )
}

export default UserInfo;
