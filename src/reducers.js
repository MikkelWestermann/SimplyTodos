import { ADD_TODO, REMOVE_TODO } from './constants';

const initialState = {
  todos: []
}

export const changeTodos = (state = initialState, action={}) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        todos: [...state.todos, action.payload]
      }
    case REMOVE_TODO:
      const array = [...state.todos];
      if (action.payload !== -1) {
        array.splice(action.payload, 1);
      }
      return { todos: array }
    default:
      return state;
  }
}
