import React from 'react';

const ProfileList = (props) => {
  const Entity = props.component;

  return(
    <div className="entity-list">
      {props.entities.map(e => <Entity key={e._id} entity={e}/>)}
    </div>
  )
}

export default ProfileList;
