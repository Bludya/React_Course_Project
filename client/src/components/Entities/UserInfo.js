import React from 'react';

const UserInfo = (props) => {
  const user = props.entity;
  return(
    <div className="user-info">
      <span>Username: {user.username}</span>
      <span>Roles: {JSON.stringify(user.roles)}</span>
      {
        user.banned ?
        (<span className="banText">BANNED</span>) : ''
      }
      {props.addOnComponent}
    </div>
  )
}

export default UserInfo;
