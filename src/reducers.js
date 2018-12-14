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

const initialState = {
  todos: [],
  doneTodos: []
}

export const updateTodosWithoutUser = (state = initialState, action={}) => {
  switch (action.type) {
    case ADD_TODO:
      return Object.assign({}, state, { todos: [...state.todos, action.payload] })
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

const initialStateWithUser = {
  isPending: false,
  error: '',
  todos: [],
  doneTodos: []
}

export const updateTodos = (state=initialStateWithUser, action={}) => {
  switch (action.type) {
    case REQUEST_TODOS_PENDING:
      return Object.assign({}, state, { isPending: true });
    case REQUEST_TODOS_SUCCESS:
      return Object.assign({}, state, { todos: action.payload.todos, doneTodos: action.payload.doneTodos, isPending: false });
    case REQUEST_TODOS_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    case ADD_TODO_PENDING:
      return Object.assign({}, state, { isPending: true });
    case ADD_TODO_SUCCESS:
      return Object.assign({}, state, { todos: [...state.todos, action.payload], isPending: false });
    case ADD_TODO_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    case REMOVE_TODO_PENDING:
      return Object.assign({}, state, { isPending: true });
    case REMOVE_TODO_SUCCESS:
      return Object.assign({}, state, { todos: action.payload.todos, doneTodos: [...state.doneTodos, action.payload.doneTodo], isPending: false });
    case REMOVE_TODO_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false });
      case REMOVE_DONE_TODO_PENDING:
        return Object.assign({}, state, { isPending: true });
      case REMOVE_DONE_TODO_SUCCESS:
        return Object.assign({}, state, { doneTodos: action.payload, isPending: false });
      case REMOVE_DONE_TODO_FAILED:
        return Object.assign({}, state, { error: action.payload, isPending: false });
    default:
      return state;
  }
}
