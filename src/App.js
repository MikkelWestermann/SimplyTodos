import React, { Component } from 'react';
import './App.css';
import List from './Components/List';
import Form from './Components/Form';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    }
  }
  handleAddTodo = (todo) => {
    if(todo.length === 0) {
      return;
    }
    this.setState(prevState => ({
      todos: [...prevState.todos, todo]
    }));
  }
  handleRemoveTodo = (index) => {
    const array = [...this.state.todos];
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({todos: array});
    }
  }
  render() {
    return(
      <div className='App'>
        <h1>Simply Todos</h1>
        <Form
          onAddTodo={this.handleAddTodo}
        />
        <List
          todos={this.state.todos}
          onRemoveTodo={this.handleRemoveTodo}
        />
      </div>
    );
  }
}

export default App;
