import {
  USERS_REQUEST,
  USERS_RECEIVE,
  USERS_FAIL
} from '../actions/users';

const initialState = {
  isFetching: false,
  error: '',
  list: []
};

export function users(state = initialState, action){
  switch (action.type) {
  case USERS_REQUEST:
    return Object.assign({},state,{
      isFetching: true,
      error: ''
    });
  case USERS_RECEIVE:
    return Object.assign({}, state, {
      isFetching: false,
      error:'',
      list: action.data
    });
  case USERS_FAIL:
    return Object.assign({},state, {
      isFetching: false,
      error: 'Error' + action.data
    });
  default:
    return state;
  }
}
