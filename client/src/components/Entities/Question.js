import React, {Fragment} from 'react';
import './Question.css';

const Question = (props) =>(
  <Fragment>
    <div className={props.showAsLink ? "question link" : ''} onClick={props.getQuestionMethod}>
      <h1>{props.entity.text}</h1>
      <div className="tags">
        {
          props.entity.tags ?
          props.entity.tags.map(t => <span key={t._id} id="tag">#{t.name}</span>) : '#'
        }
      </div>
      {props.showAuthor ? <div className="author">By: {props.entity.author ? props.entity.author.username : 'Anonymous'}</div> : ''}
    </div>
    {props.addOnComponent}
  </Fragment>
)

export default Question;
