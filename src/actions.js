import { ADD_TODO, REMOVE_TODO } from './constants';

export const setTodos = (text) => ({
  type: ADD_TODO,
  payload: text
})

export const removeTodo = (index) => ({
  type: REMOVE_TODO,
  payload: index
})
