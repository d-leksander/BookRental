import { connect } from 'react-redux';
import BooksOrder from '../screens/BooksOrder';
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
    onOrder: (data) => {
      dispatch(fetch('order', data));
    },
    onRate: (data) => {
      dispatch(fetch('rate', data));
    },
  };
};

export const BooksOrderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BooksOrder);
