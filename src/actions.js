import {
  ADD_TODO, REMOVE_TODO,
  REMOVE_DONE_TODO,
  REQUEST_TODOS_PENDING,
  REQUEST_TODOS_SUCCESS,
  REQUEST_TODOS_FAILED,
  REQUEST_DONE_TODOS_PENDING,
  REQUEST_DONE_TODOS_SUCCESS,
  REQUEST_DONE_TODOS_FAILED,
  WIPE_TODOS,
  ADD_TODO_PENDING,
  ADD_TODO_SUCCESS,
  ADD_TODO_FAILED,
  REMOVE_TODO_PENDING,
  REMOVE_TODO_SUCCESS,
  REMOVE_TODO_FAILED,
  REMOVE_DONE_TODO_PENDING,
  REMOVE_DONE_TODO_SUCCESS,
  REMOVE_DONE_TODO_FAILED,
  SIGN_IN_PENDING,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILED,
  REGISTER_PENDING,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  SIGN_OUT,
  CHANGE_ACCOUNT_ROUTE
} from './constants';

const apiRequest = (route, body, pending, success, failed, dispatch) => {
  dispatch({ type: pending });
  fetch(`http://localhost:3000/${route}`, {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        dispatch({ type: success, payload: data })
      } else {
        dispatch({type: failed, payload: data})
      }
    })
    .catch(error => dispatch({type: failed, payload: error}))
}

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

export const requestTodos = (email) => (dispatch) => {
  const body = {
    input: email
  }
  apiRequest(
    'requesttodos',
    body,
    REQUEST_TODOS_PENDING,
    REQUEST_TODOS_SUCCESS,
    REQUEST_TODOS_FAILED,
    dispatch
  )
}

export const requestDoneTodos = (email) => (dispatch) => {
  const body = {
    input: email
  }
  apiRequest(
    'requestdonetodos',
    body,
    REQUEST_DONE_TODOS_PENDING,
    REQUEST_DONE_TODOS_SUCCESS,
    REQUEST_DONE_TODOS_FAILED,
    dispatch
  )
}

export const addTodo = (email, todo) => (dispatch) => {
  const body = {
    email: email,
    todo: todo
  }
  apiRequest(
    'addtodo',
    body,
    ADD_TODO_PENDING,
    ADD_TODO_SUCCESS,
    ADD_TODO_FAILED,
    dispatch
  )
}

export const removeTodoWithUser = (email, todo) => (dispatch) => {
  const body = {
    email: email,
    todo: todo
  }
  apiRequest(
    'removetodo',
    body,
    REMOVE_TODO_PENDING,
    REMOVE_TODO_SUCCESS,
    REMOVE_TODO_FAILED,
    dispatch
  )
}

export const removeDoneTodoWithUser = (email, todo) => (dispatch) => {
  const body = {
    email: email,
    todo: todo
  }
  apiRequest(
    'removedonetodo',
    body,
    REMOVE_DONE_TODO_PENDING,
    REMOVE_DONE_TODO_SUCCESS,
    REMOVE_DONE_TODO_FAILED,
    dispatch
  )
}

export const signIn = (email, password) => (dispatch) => {
  const body = {
    email: email,
    password: password
  }
  apiRequest(
    'signin',
    body,
    SIGN_IN_PENDING,
    SIGN_IN_SUCCESS,
    SIGN_IN_FAILED,
    dispatch
  )
}

export const register = (email, password) => (dispatch) => {
  const body = {
    email: email,
    password: password
  }
  apiRequest(
    'register',
    body,
    REGISTER_PENDING,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    dispatch
  )
}

export const wipeTodos = () => ({
  type: WIPE_TODOS
})

export const signOut = () => ({
  type: SIGN_OUT
})

export const accountRoute = route => ({
  type: CHANGE_ACCOUNT_ROUTE,
  payload: route
})
