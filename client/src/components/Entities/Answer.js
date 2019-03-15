import React from 'react';
import './Answer.css';

let ANONYMOUS_PROFILE_PICTURE = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcAueZnclibCzt5r71j_FccR1aXNE5J3aDwxkK9zIWvorx7LpIFw';


const Answer = (props) => (
  <div className="answer column" key={props.entity._id}>
    {props.showAuthor ? <img className="profile-picture" src={props.entity.author? props.entity.author.profilePicture : ANONYMOUS_PROFILE_PICTURE} alt="Img not found." /> : ''}
    {props.showQuestion ? <span className="answer-question">{props.entity.question.text}</span> : ''}
    <h1>{props.entity.text}</h1>
    {props.showAuthor ? <div className="author">{props.entity.author ? props.entity.author.username : 'Anonymous'} </div> : ''}
    {props.addOnComponent}
  </div>
)

export default Answer;
