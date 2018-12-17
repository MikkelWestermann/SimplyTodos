import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import List from '../Components/List';
import Form from '../Components/Form';
import Signin from '../Components/Signin/Signin';
import Register from '../Components/Register/Register';
import Navigation from '../Components/Navigation/Navigation';

import {
  setTodos,
  removeTodo,
  removeDoneTodo,
  requestTodos,
  requestDoneTodos,
  addTodo,
  removeTodoWithUser,
  removeDoneTodoWithUser,
  accountRoute
} from '../actions';

const mapStateToProps = state => {
  return {
    noUserTodos: state.updateTodosWithoutUser.todos,
    noUserDoneTodos: state.updateTodosWithoutUser.doneTodos,
    userTodos: state.updateTodos.todos,
    userDoneTodos: state.updateTodos.doneTodos,
    isPending: state.updateTodos.isPending,
    error: state.updateTodos.error,
    isSignedIn: state.account.isSignedIn,
    accountRoute: state.accountRoute.route,
    email: state.account.email
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
    handleRequestTodos: email => dispatch(requestTodos(email)),
    handleRequestDoneTodos: email => dispatch(requestDoneTodos(email)),
    handleAddTodoWithUser: (email, todo) => dispatch(addTodo(email, todo)),
    handleRemoveTodoWithUser: (email, todo) => dispatch(removeTodoWithUser(email, todo)),
    handleRemoveDoneTodoWithUser: (email, todo) => dispatch(removeDoneTodoWithUser(email, todo)),
    handleAccountRoute: route => {dispatch(accountRoute(route))}
  }
}

class App extends Component {
  // make a request to the api to get the todos and done todos from the db
  getTodos = () => {
    if (this.props.isSignedIn) {
      this.props.handleRequestTodos(this.props.email);
      this.props.handleRequestDoneTodos(this.props.email);
    }
  }
  // Check if there are only done todos left
  isAllDone = () => {
    if (this.props.isSignedIn) {
      return this.props.userTodos.length === 0 && this.props.userDoneTodos.length > 0 ? true : false;
    } else {
      return this.props.noUserTodos.length === 0 && this.props.noUserDoneTodos.length > 0 ? true : false;
    }
  }
  // Change the color from blue to green when you're done with all your todos
  color = () => {
    return this.isAllDone() ? '55e888' : '38b3be'
  }
  // if you press sign in this activates the sign in form
  showSigninForm = () => {
    if (this.props.accountRoute === 'signin' && !this.props.isSignedIn) {
      return true;
    }
    return false;
  }
  // if you press register this activates register form
  showRegisterForm = () => {
    if (this.props.accountRoute === 'register' && !this.props.isSignedIn) {
      return true;
    }
    return false;
  }
  render() {
    // check if there is a user that is signed in. If there is, then return
    // this with all the async functions that contact the api. Otherwise return
    // the other one** where the sync functions are passed to make it usable
    // even if you're not logged in.
    if (this.props.isSignedIn) {
      return(
        <div style={{color:`#${this.color()}`}} className='App' >
          <Navigation />
          <div className='menu'>
            <div className='todoForm'>
              <h1>Simply Todos</h1>
              <Form
                onAddTodo={this.props.handleAddTodoWithUser}
                userEmail={this.props.email}
                color={this.color()}
                isSignedIn={true}
                isGreen={this.isAllDone()}
              />
            </div>
          </div>
          {
            this.props.userTodos.length === 0 && this.props.userDoneTodos.length === 0
            &&
            <h2 onClick={this.getTodos} className='loadTodos' >Load Todos</h2>
          }
          <List
            todos={this.props.userTodos}
            onRemoveTodo={this.props.handleRemoveTodoWithUser}
            userEmail={this.props.email}
            isSignedIn={true}
            color={'38b3be'}
          />
          {
            // check if there are any done todos, if there is then return
            // a new list with the done todos
            this.props.userDoneTodos.length !== 0
            &&
            <div>
              <h2>Done Todos</h2>
              <List
                todos={this.props.userDoneTodos}
                onRemoveTodo={this.props.handleRemoveDoneTodoWithUser}
                userEmail={this.props.email}
                isSignedIn={true}
                color={'55e888'}
              />
            </div>
          }
        </div>
      );
    } else {
      // **this is the other one...
      return(
        <div style={{color:`#${this.color()}`}} className='App' >
          <Navigation />
          <div className='menu'>
            <div className='todoForm'>
              <h1>Simply Todos</h1>
              <Form
                onAddTodo={this.props.handleAddTodo}
                isSignedIn={false}
                userEmail=''
                color={this.color()}
                isGreen={this.isAllDone()}
              />
            </div>
            {
              // checking if the sign in form should be shown
              this.showSigninForm()
              &&
              <Signin getTodos={this.getTodos} />
            }
            {
              // checking if the register form should be shown
              this.showRegisterForm()
              &&
              <Register getTodos={this.getTodos} />
            }
          </div>
          <List
            todos={this.props.noUserTodos}
            onRemoveTodo={this.props.handleRemoveTodo}
            isSignedIn={false}
            userEmail=''
            color={'38b3be'}
          />
          {
            // check if there are any done todos, if there is then return
            // a new list with the done todos
            this.props.noUserDoneTodos.length !== 0
            &&
            <div>
              <h2>Done Todos</h2>
              <List
                todos={this.props.noUserDoneTodos}
                onRemoveTodo={this.props.handleRemoveDoneTodo}
                isSignedIn={false}
                userEmail=''
                color={'55e888'}
              />
            </div>
          }
        </div>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
