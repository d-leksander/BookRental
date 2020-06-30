import { connect } from 'react-redux';
import UsersList from '../screens/UsersList';
import { fetch } from '../actions/users';

const mapStateToProps = (state) => {
  return {
    users: state.users.list,
    error: state.users.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInit: () => {
      dispatch(fetch('list'));
    },
    onDel: (idx) => {
      dispatch(fetch('del', {
        idx
      }));
    },
    onEdit: (data) => {
      dispatch(fetch('edit', data));
    }
  };
};

export const UsersListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersList);
