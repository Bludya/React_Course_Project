import React, {Fragment} from 'react';

const AnswerButtons = (props) => (
  <Fragment>
    {
      props.isAdmin ?
      (<span className="button link"
            id="show-answers"
            onClick={() => props.deleteAnswerMethod(props.entity._id)}>
        <i className="fa fa-trash" aria-hidden="true" ></i>
      </span>) : ''
    }
    <span className={window.sessionStorage.token ? 'button link' : 'button'}
          id="thumb-ups"
          onClick={() => props.rateAnswerMethod(props.entity._id, 'up')}>
      <i className="fa fa-thumbs-up" aria-hidden="true" >{props.entity.ups.length}</i>
    </span>
    <span className={window.sessionStorage.token ? 'button link' : 'button'}
          id="thumb-downs"
          onClick={() => props.rateAnswerMethod(props.entity._id, 'down')}>
      <i className="fa fa-thumbs-down" aria-hidden="true" >{props.entity.downs.length}</i>
    </span>
  </Fragment>
)

export default AnswerButtons;
