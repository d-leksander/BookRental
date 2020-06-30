import { connect } from 'react-redux';
import Profile from '../screens/Profile';
import { fetch } from '../actions/auth';

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    error: state.auth.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInit: (data) => {
      dispatch(fetch('info', data));
    },
    onCancel: (data) => {
      dispatch(fetch('cancel', data));
    }
  };
};

export const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
