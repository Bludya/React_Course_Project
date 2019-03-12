import React, {Fragment} from 'react';

const Question = (props) =>(
  <Fragment>
    <div onClick={props.getQuestionMethod}>
      <h1 className="">{props.entity.text}</h1>
      <div className="tags">
        {
          props.entity.tags ?
          props.entity.tags.map(t => <span key={t._id} id="tag">#{t.name}</span>) : '#'
        }
      </div>
      <div className="author">By: {props.entity.author ? props.entity.author.username : 'Anonymous'}</div>
      {props.addOnComponent}
    </div>
  </Fragment>
)

export default Question;
