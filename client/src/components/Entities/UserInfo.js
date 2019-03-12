import React from 'react';

const UserInfo = (props) => {
  const user = props.entity;
  console.log(user);
  return(
    <div className="user-info">
      <span>Username: {user.username}</span>
    </div>
  )
}

export default UserInfo;
