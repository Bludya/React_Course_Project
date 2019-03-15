import React from 'react';

const QuestionButtons = (props) =>(
  <div id="buttons-container" className="row justify-content-center">
    <span className="button link"
          id="show-answer-form"
          onClick={props.showAnswerForm}>
      <i className="fa fa-comment" aria-hidden="true"></i>
    </span>
    <span className="button link"
          id="show-answers"
          onClick={props.showAnswers}>
      <i className="fa fa-comments" aria-hidden="true"></i>
    </span>
    <span className={window.sessionStorage.token ? 'button link' : 'button'}
          id="show-answer-form"
          onClick={() => props.rateQuestionMethod('up')}>
      <i className="fa fa-thumbs-up" aria-hidden="true">{props.thumbsUp}</i>
    </span>
    <span className={window.sessionStorage.token ? 'button link' : 'button'}
          id="show-answers"
          onClick={() => props.rateQuestionMethod('down')}>
      <i className="fa fa-thumbs-down" aria-hidden="true">{props.thumbsDown}</i>
    </span>
  </div>
)

export default QuestionButtons;
