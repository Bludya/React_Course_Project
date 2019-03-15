import React, {Fragment} from 'react';

const UserButtons = (props) => (
  <div className="user-buttons">
    <span
      className="link"
      onClick={() => props.userBan(props.id, !props.banned)}
    >
      {props.banned ?
        <i class="fa fa-arrow-left" aria-hidden="true"> Unban</i> :
        <i class="fa fa-hand-stop-o"> Ban</i>
      }
    </span>
    <span className="link" onClick={() => props.makeAdmin(props.id)}>
      <i class="fa fa-black-tie"> Make Admin</i>
    </span>
  </div>
)

export default UserButtons;
