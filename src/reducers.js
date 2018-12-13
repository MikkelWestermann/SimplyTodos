import { ADD_TODO, REMOVE_TODO, REMOVE_DONE_TODO } from './constants';

const initialState = {
  todos: [],
  doneTodos: []
}

export const changeTodos = (state = initialState, action={}) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        todos: [...state.todos, action.payload],
        doneTodos: state.doneTodos
      }
    case REMOVE_TODO:
      const array = [...state.todos];
      let newDoneItem = null;
      if (action.payload !== -1) {
        newDoneItem = array.splice(action.payload, 1);
      }
      return {
        todos: array,
        doneTodos: [...state.doneTodos, ...newDoneItem]
      }
    case REMOVE_DONE_TODO:
      const doneArray = [...state.doneTodos];
      if (action.payload !== -1) {
        doneArray.splice(action.payload, 1);
      }
      return {
        todos: state.todos,
        doneTodos: doneArray
      }
    default:
      return state;
  }
}
