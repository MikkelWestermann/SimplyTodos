import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import List from '../Components/List';
import Form from '../Components/Form';

import { setTodos, removeTodo, removeDoneTodo } from '../actions';

const mapStateToProps = state => {
  return {
    todos: state.todos,
    doneTodos: state.doneTodos
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
    },
    handleRemoveDoneTodo: index => {
      dispatch(removeDoneTodo(index))
    }
  }
}

class App extends Component {
  isAllDone = () => {
    return this.props.todos.length === 0 && this.props.doneTodos.length > 0 ? true : false;
  }
  color = () => {
    return this.isAllDone() ? '55e888' : '38b3be'
  }
  render() {
    return(
      <div style={{color:`#${this.color()}`}} className='App' >
        <h1>Simply Todos</h1>
        <Form
          onAddTodo={this.props.handleAddTodo}
          color={this.color()}
          isGreen={this.isAllDone()}
        />
        <List
          todos={this.props.todos}
          onRemoveTodo={this.props.handleRemoveTodo}
          color={'38b3be'}
        />
        {
          this.props.doneTodos.length !== 0
          &&
          <div>
            <h2>Done Todos</h2>
            <List
              todos={this.props.doneTodos}
              onRemoveTodo={this.props.handleRemoveDoneTodo}
              color={'55e888'}
            />
          </div>
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
