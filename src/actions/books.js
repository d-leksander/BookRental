import axios from 'axios';

export const BOOKS_REQUEST = 'BOOKS_REQUEST';
export const BOOKS_RECEIVE = 'BOOKS_RECEIVE';
export const BOOKS_FAIL = 'BOOKS_FAIL';

const urls = {
  'list': '/api/books',
  'add': '/api/books/add',
  'del': '/api/books/del',
  'edit': '/api/books/edit',
  'order': '/api/books/order',
  'rate': '/api/books/rate'
};

function request(name, data) {
  return {
    type: BOOKS_REQUEST,
    name: name,
    data: data
  };
}

function receive(name, data) {
  return {
    type: BOOKS_RECEIVE,
    name: name,
    data: data
  };
}

function fail(name, data) {
  return {
    type: BOOKS_FAIL,
    name: name,
    data: data
  };
}

export function fetch(name, data) {
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
