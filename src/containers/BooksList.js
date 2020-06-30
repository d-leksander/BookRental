import { connect } from 'react-redux';
import BooksList from '../screens/BooksList';
import { fetch } from '../actions/books';

const mapStateToProps = (state) => {
  return {
    books: state.books.list,
    error: state.books.error
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
      if (data.id) {
        dispatch(fetch('edit', data));
      } else {
        dispatch(fetch('add', data));
      }
    }
  };
};

export const BooksListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BooksList);
