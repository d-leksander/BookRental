import {
  AUTH_REQUEST,
  AUTH_RECEIVE,
  AUTH_FAIL
} from '../actions/auth';
import { openSnackbar } from '../components/Notifier';

const initialState = {
  isFetching: false,
  error: '',
  user: {}
};

export function auth(state = initialState, action){
  switch (action.type) {
  case AUTH_REQUEST:
    return Object.assign({},state,{
      isFetching: true,
      error: ''
    });
  case AUTH_RECEIVE:
    return Object.assign({}, state, {
      isFetching: false,
      error:'',
      user: action.data
    });
  case AUTH_FAIL:
    openSnackbar({ message: action.data, type: 'error' });
    return Object.assign({},state, {
      isFetching: false,
      error: 'Error' + action.data
    });
  default:
    return state;
  }
}
