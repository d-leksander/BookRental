import axios from 'axios';
import { createHashHistory } from 'history';

const history = createHashHistory();

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_RECEIVE = 'AUTH_RECEIVE';
export const AUTH_FAIL = 'AUTH_FAIL';

const urls = {
  'login': '/api/auth/login',
  'logout': '/api/auth/logout',
  'register': '/api/auth/register',
  'edit': '/api/auth/edit',
  'info': '/api/auth/info',
  'cancel': '/api/auth/cancel',
};

function request(name, data) {
  return {
    type: AUTH_REQUEST,
    name: name,
    data: data
  };
}

function receive(name, data) {
  return {
    type: AUTH_RECEIVE,
    name: name,
    data: data
  };
}

function fail(name, data) {
  return {
    type: AUTH_FAIL,
    name: name,
    data: data
  };
}

export function fetch(name, data) {
  return (dispatch) => {
    dispatch(request(name, data));
    return axios.post(urls[name], data).then(res => {
      dispatch(receive(name, res.data));
      // Redirect to home page after logout action success
      if (name === 'logout') history.push('/');
    }).catch(err => {
      dispatch(fail(name, err.response ? err.response.data : err.message || 'Server status' + err.status));
    });
  };
}
