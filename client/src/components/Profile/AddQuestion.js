import React, {Component} from 'react';

//class because in he future similar tags and quesions will be generated dynamically
class AddQuestion extends Component {
  constructor(props){
    super(props);
    this.state = {
      tags: '',
      text: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleQuesionSubmit = props.handleQuesionSubmit.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render(){
    return(
      <div className="add-question">
        <h1>Add Question</h1>
        <form id="question-form" onSubmit={(event) => this.handleQuesionSubmit(event, this.state)}>
          <div className="tag-input-group input-group">
            <label forhtml="tag-input">#</label>
            <input type="text" id="tag-input" className="tag-input" value={this.state.tags} name="tags" onChange={this.handleChange} placeholder="tag1,tag2"/>
          </div>
          <label htmlFor="text">Question</label>
          <textarea rows="3" value={this.state.questionText} onChange={this.handleChange} form="question-form" name="text"/>
          <input type="submit" value="Post Question"/>
        </form>
      </div>
    )
  }
}

export default AddQuestion;
