import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import List from '../Components/List';
import Form from '../Components/Form';

import {
  setTodos,
  removeTodo,
  removeDoneTodo,
  requestTodos,
  addTodo,
  removeTodoWithUser,
  removeDoneTodoWithUser
} from '../actions';

const mapStateToProps = state => {
  return {
    noUserTodos: state.updateTodosWithoutUser.todos,
    noUserDoneTodos: state.updateTodosWithoutUser.doneTodos,
    userTodos: state.updateTodos.todos,
    userDoneTodos: state.updateTodos.doneTodos,
    isPending: state.updateTodos.isPending,
    error: state.updateTodos.error
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
    handleRemoveTodo: index => {dispatch(removeTodo(index))},
    handleRemoveDoneTodo: index => {dispatch(removeDoneTodo(index))},
    handleRequestTodos: () => dispatch(requestTodos()),
    handleAddTodoWithUser: todo => dispatch(addTodo(todo)),
    handleRemoveTodoWithUser: todo => dispatch(removeTodoWithUser(todo)),
    handleRemoveDoneTodoWithUser: todo => dispatch(removeDoneTodoWithUser(todo))
  }
}

class App extends Component {
  componentDidMount() {
    this.props.handleRequestTodos();
  }
  isAllDone = () => {
    return this.props.userTodos.length === 0 && this.props.userDoneTodos.length > 0 ? true : false;
  }
  color = () => {
    return this.isAllDone() ? '55e888' : '38b3be'
  }
  render() {
    return(
      <div style={{color:`#${this.color()}`}} className='App' >
        <h1>Simply Todos</h1>
        <Form
          onAddTodo={this.props.handleAddTodoWithUser}
          color={this.color()}
          isGreen={this.isAllDone()}
        />
        <List
          todos={this.props.userTodos}
          onRemoveTodo={this.props.handleRemoveTodoWithUser}
          color={'38b3be'}
        />
        {
          this.props.userDoneTodos.length !== 0
          &&
          <div>
            <h2>Done Todos</h2>
            <List
              todos={this.props.userDoneTodos}
              onRemoveTodo={this.props.handleRemoveDoneTodoWithUser}
              color={'55e888'}
            />
          </div>
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
