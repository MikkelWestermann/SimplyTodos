import {
  ADD_TODO, REMOVE_TODO,
  REMOVE_DONE_TODO,
  REQUEST_TODOS_PENDING,
  REQUEST_TODOS_SUCCESS,
  REQUEST_TODOS_FAILED,
  ADD_TODO_PENDING,
  ADD_TODO_SUCCESS,
  ADD_TODO_FAILED,
  REMOVE_TODO_PENDING,
  REMOVE_TODO_SUCCESS,
  REMOVE_TODO_FAILED,
  REMOVE_DONE_TODO_PENDING,
  REMOVE_DONE_TODO_SUCCESS,
  REMOVE_DONE_TODO_FAILED
} from './constants';

export const setTodos = (text) => ({
  type: ADD_TODO,
  payload: text
})

export const removeTodo = (index) => ({
  type: REMOVE_TODO,
  payload: index
})

export const removeDoneTodo = (index) => ({
  type: REMOVE_DONE_TODO,
  payload: index
})

export const requestTodos = () => (dispatch) => {
  dispatch({ type: REQUEST_TODOS_PENDING });
  fetch('http://localhost:3000/')
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_TODOS_SUCCESS, payload: data }))
    .catch(error => dispatch({type: REQUEST_TODOS_FAILED, payload: error}))
}

export const addTodo = (todo) => (dispatch) => {
  dispatch({ type: ADD_TODO_PENDING });
  fetch('http://localhost:3000/addtodo', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      input: todo
    })
  })
    .then(response => response.json())
    .then(data => dispatch({ type: ADD_TODO_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: ADD_TODO_FAILED, payload: error }))
}

export const removeTodoWithUser = (todo) => (dispatch) => {
  dispatch({ type: REMOVE_TODO_PENDING });
  fetch('http://localhost:3000/removetodo', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      input: todo
    })
  })
    .then(response => response.json())
    .then(data => dispatch({ type: REMOVE_TODO_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REMOVE_TODO_FAILED, payload: error }))
}

export const removeDoneTodoWithUser = (todo) => (dispatch) => {
  dispatch({ type: REMOVE_DONE_TODO_PENDING });
  fetch('http://localhost:3000/removedonetodo', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      input: todo
    })
  })
    .then(response => response.json())
    .then(data => dispatch({ type: REMOVE_DONE_TODO_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REMOVE_DONE_TODO_FAILED, payload: error }))
}
