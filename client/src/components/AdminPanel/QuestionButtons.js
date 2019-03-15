import React,{Fragment} from 'react';

const QuestionButtons = (props) => (
  <Fragment>
    <span className="link" onClick={() => props.approveQuestion(props.id)}><i class="fa fa-check" aria-hidden="true"></i> Approve</span>
  </Fragment>
)

export default QuestionButtons;
