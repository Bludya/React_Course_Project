import React from 'react';

const UserInfo = (props) => {
  const user = props.user;

  return(
    <div className="entity-list">
      {props.entities.map(e => <Entity key={e._id} entity={e}/>)}
    </div>
  )
}

export default UserInfo;
