import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import List from '../Components/List';
import Form from '../Components/Form';

import { setTodos, removeTodo } from '../actions';

const mapStateToProps = state => {
  return {
    todos: state.todos
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleAddTodo: todo => {
      if(todo.length === 0) {
        return;
      }
      dispatch(setTodos([todo]));
    },
    handleRemoveTodo: index => {
      dispatch(removeTodo(index))
    }
  }
}

class App extends Component {
  render() {
    return(
      <div className='App' >
        <h1>Simply Todos</h1>
        <Form
          onAddTodo={this.props.handleAddTodo}
        />
        <List
          todos={this.props.todos}
          onRemoveTodo={this.props.handleRemoveTodo}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
