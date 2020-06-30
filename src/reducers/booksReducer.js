import {
  BOOKS_REQUEST,
  BOOKS_RECEIVE,
  BOOKS_FAIL
} from '../actions/books';

const initialState = {
  isFetching: false,
  error: '',
  list: []
};

export function books(state = initialState, action) {
  switch (action.type) {
  case BOOKS_REQUEST:
    return Object.assign({}, state, {
      isFetching: true,
      error: ''
    });
  case BOOKS_RECEIVE:
    return Object.assign({}, state, {
      isFetching: false,
      error: '',
      list: action.data
    });
  case BOOKS_FAIL:
    return Object.assign({}, state, {
      isFetching: false,
      error: 'Error' + action.data
    });
  default:
    return state;
  }
}
