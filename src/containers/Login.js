import { connect } from 'react-redux';
import Login from '../screens/Login';
import { fetch } from '../actions/auth';

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (user) => {
      dispatch(fetch('login', user));
    },
    onRegister: (user) => {
      dispatch(fetch('register', user));
    }
  };
};

export const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
