import React, { Component } from 'react';
import './Form.css';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVal: ''
    }
  }
  handleAddTodo = (event) => {
    if (this.state.inputVal !== ''){
      this.props.isSignedIn ?
      this.props.onAddTodo(this.props.userEmail, event.target[0].value)
      :
      this.props.onAddTodo(event.target[0].value);
    }
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.handleAddTodo(event);
    this.setState({
      inputVal: ''
    })
  }
  onInputChange = (event) => {
    this.setState({
      inputVal: event.target.value
    })
  }
  isGreen = () => {
    return this.props.isGreen ? 'isGreen' : 'isBlue';
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit} autoComplete='off' >
        <input type='text' placeholder='Add Todo' id='textField' value={this.state.inputVal} onChange={this.onInputChange} style={{color: `#${this.props.color}`}} />
        <button type='submit' id={this.isGreen()}>Add</button>
      </form>
    );
  }
}

export default Form;
