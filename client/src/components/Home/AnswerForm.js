import React, {Component, Fragment} from 'react';

const AnswerForm = (props) => (
  <Fragment>
    <form id="answer-form" onSubmit={props.submitHandler} >
      <textarea rows="3" form="answer-form" name="text"/>
      <input type="submit" value="Answer"/>
    </form>
  </Fragment>
)

export default AnswerForm;
