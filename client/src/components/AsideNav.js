import React, {Component} from 'react';

const AsideNav = (props) => (
  <aside className="col-xl-3">
    <ul>
      {props.elementsData.map(e => <li className="link" onClick={e.onClick}>{e.text}</li>)}
    </ul>
  </aside>
)

export default AsideNav;
