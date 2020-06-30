import axios from 'axios';

export const USERS_REQUEST = 'USERS_REQUEST';
export const USERS_RECEIVE = 'USERS_RECEIVE';
export const USERS_FAIL = 'USERS_FAIL';

const urls = {
  'list': '/api/users',
  'add': '/api/users/add',
  'del': '/api/users/del',
  'edit': '/api/users/edit'
};

function request(name, data){
  return {
    type: USERS_REQUEST,
    name: name,
    data: data
  };
}

function receive(name, data){
  return {
    type: USERS_RECEIVE,
    name: name,
    data: data
  };
}

function fail(name, data){
  return {
    type: USERS_FAIL,
    name: name,
    data: data
  };
}

export function fetch(name, data){
  return (dispatch) => {
    dispatch(request(name, data));
    return axios.post(urls[name], data).then(res => {
      dispatch(receive(name, res.data));
    }).catch(err => {
      if (err instanceof Error) {
        // Something happened in setting up the request that triggered an Error
        dispatch(fail(name, err.message));
      } else {
        // The request was made, but the server responded with a status code
        // that falls out of the range of 2xx
        dispatch(fail(name, 'Server status' + err.status));
      }
    });
  };
}
