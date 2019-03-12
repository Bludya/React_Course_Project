import React, {Fragment} from 'react';

const AdminPanelList = (props) => {
  const entityType = props.entityType;
  const Entity = props.component;

  return(
    <div className="entity-list">
      {props.entities.map(e => (
        <Fragment>
          <Entity key={e._id} entity={e}
          addOnComponent=
          {entityType === 'question' ?
            (<span onClick={() => props.functions.approveQuestion(e._id)}>Approve</span>) :
            (
              <Fragment>
                <span onClick={() => props.functions.userBan(e._id, !e.banned)}>Ban</span>
                <span onClick={() => props.functions.makeAdmin(e._id)}>Make Admin</span>
              </Fragment>
            )
          }
          />
        </Fragment>
      ))}
    </div>
  )
}

export default AdminPanelList;
