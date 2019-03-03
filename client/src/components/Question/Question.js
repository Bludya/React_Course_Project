import React, {Fragment} from 'react';

const Question = (props) =>(
  <div>
    {props.entity ? (
      <Fragment>
        <h1>{props.entity.text}</h1>
        <div className="tags">
          {
            props.entity.tags ?
            props.entity.tags.map(t => <span key={t._id} id="tag">#{t.name}</span>) : '#'
          }
        </div>
        <div className="author">By: {props.entity.author ? props.entity.author.username : 'Anonymous'}</div>
      </Fragment>) :
      (<h1 className="question">{props.message}</h1>)
    }
  </div>)

export default Question;
