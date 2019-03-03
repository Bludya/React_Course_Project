import React from 'react';

let ANONYMOUS_PROFILE_PICTURE = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcAueZnclibCzt5r71j_FccR1aXNE5J3aDwxkK9zIWvorx7LpIFw';


const Answer = (props) => (
  <div className="answer" key={props.entity._id}>
    <img className="profile-picture" src={props.entity.author? props.entity.author.profilePicture : ANONYMOUS_PROFILE_PICTURE} alt="Img not found." />
    <h1>{props.entity.text}</h1>
    <div className="author">By: {props.entity.author ? props.entity.author.username : 'Anonymous'} </div>
    <span className="button"
          id="show-answers"
          onClick={() => props.deleteAnswerMethod(props.entity._id)}>
      <i className="fa fa-trash" aria-hidden="true" ></i>
    </span>
  </div>
)

export default Answer;
