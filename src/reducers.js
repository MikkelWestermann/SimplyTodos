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
      return Object.assign({}, state, { todos: action.payload.todos, isPending: false });
    case REQUEST_TODOS_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    case REQUEST_DONE_TODOS_PENDING:
      return Object.assign({}, state, { isPending: true });
    case REQUEST_DONE_TODOS_SUCCESS:
      return Object.assign({}, state, { doneTodos: action.payload.todos, isPending: false });
    case REQUEST_DONE_TODOS_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    case ADD_TODO_PENDING:
      return Object.assign({}, state, { isPending: true });
    case ADD_TODO_SUCCESS:
      return Object.assign({}, state, { todos: [...state.todos, action.payload.todo], isPending: false });
    case ADD_TODO_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    case REMOVE_TODO_PENDING:
      return Object.assign({}, state, { isPending: true });
    case REMOVE_TODO_SUCCESS:
      return Object.assign({}, state, { isPending: false, doneTodos: [...state.doneTodos, action.payload.doneTodo], todos: action.payload.todos})
    case REMOVE_TODO_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    case REMOVE_DONE_TODO_PENDING:
      return Object.assign({}, state, { isPending: true });
    case REMOVE_DONE_TODO_SUCCESS:
      return Object.assign({}, state, { isPending: false, doneTodos: action.payload.doneTodos });
    case REMOVE_DONE_TODO_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    case WIPE_TODOS:
      return state=initialStateWithUser;
    default:
      return state;
  }
}

const initialStateAccount = {
  isPending: false,
  isSignedIn: false,
  error: '',
  email: ''
}

export const account = (state=initialStateAccount, action={}) => {
  switch (action.type) {
    case SIGN_IN_PENDING:
      return Object.assign({}, state, { isPending: true });
    case SIGN_IN_SUCCESS:
      return Object.assign({}, state, { isPending: false, isSignedIn: true, email: action.payload.email });
    case SIGN_IN_FAILED:
      return Object.assign({}, state, { isPending: false, error: action.payload });
    case REGISTER_PENDING:
      return Object.assign({}, state, { isPending: true });
    case REGISTER_SUCCESS:
      return Object.assign({}, state, { isPending: false, isSignedIn: true, email: action.payload.email });
    case REGISTER_FAILED:
      return Object.assign({}, state, { isPending: false, error: action.payload });
    case SIGN_OUT:
      return Object.assign({}, state, initialStateAccount);
    default:
      return state;
  }
}


const initialStateAccountRoute = {
  route: ''
}

export const accountRoute = (state=initialStateAccountRoute, action={}) => {
  switch (action.type) {
    case CHANGE_ACCOUNT_ROUTE:
      return Object.assign({}, state, { route: action.payload })
    default:
      return state;
  }
}
