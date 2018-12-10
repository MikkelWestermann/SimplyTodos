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
    this.props.onAddTodo(event.target[0].value);
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
  render() {
    return (
      <form onSubmit={this.handleSubmit} autoComplete='off'>
        <input type='text' placeholder='Add Todo' id='textField'  value={this.state.inputVal} onChange={this.onInputChange}/>
        <button type='submit' id='button'>Add</button>
      </form>
    );
  }
}

export default Form;
