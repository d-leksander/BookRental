import React from 'react';
import PropTypes from 'prop-types';
import { Button, Paper } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Selectable from '../components/Selectable';
import ReservationsInfo from '../components/ReservationsInfo';
import { BookForm } from '../components/BookForm';

const style = {
  button: {
    margin: 12,
  },
  fab: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  }
};

class BooksList extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      selected: [],
      form: {
        open: false,
        data: null
      },
      details: {
        open: false,
        data: null
      }
    };

    this.cols = [
      {
        id: 'id',
        title: '#'
      },
      {
        id: 'bname',
        title: 'Name'
      },
      {
        id: 'author',
        title: 'Author'
      },
      {
        id: 'photo',
        title: 'Photo'
      },
      {
        id: 'type',
        title: 'Type'
      },
      {
        id: 'count',
        title: 'Count off copies available'
      },
      {
        id: 'rate',
        title: 'Rate'
      }
    ];
  }

  componentDidMount() {
    this.props.onInit();
  }

  select(selected) {
    this.setState({ selected });
  }

  delete(idx) {
    this.props.onDel(idx || this.state.selected);
    if (!idx) this.setState({ selected: [] });
  }

  openForm(idx) {
    this.setState({ form: { open: true, data: this.props.books[idx] } });
  }

  closeForm(data) {
    this.setState({ form: { open: false } });
    if (data) this.props.onEdit(data);
  }

  openDetails(idx) {
    this.setState({ details: { open: true, data: this.props.books[idx].reservations } });
  }

  closeDetails() {
    this.setState({ details: { open: false } });
  }

  render() {
    const { props, state } = this;
    return (
      <div>
        <Paper>
          {!!state.selected.length &&
            <Button style={style} onClick={() => this.delete()}>
              Delete Selected
            </Button>
          }
          <Selectable
            cols={this.cols}
            rows={props.books}
            selected={state.selected}
            onSelect={selected => this.select(selected)}
            onDelete={idx => this.delete(idx)}
            onEdit={idx => this.openForm(idx)}
            onDetails={idx => this.openDetails(idx)}
          />
          <div>{props.error}</div>
          <BookForm
            type={state.form.type}
            open={state.form.open}
            data={state.form.data}
            onClose={(data) => this.closeForm(data)}
            label="Add"
            ref={(form) => {
              this.form = form;
            }}
          />
          <ReservationsInfo
            open={state.details.open}
            data={state.details.data}
            onClose={(data) => this.closeDetails(data)}
          />
        </Paper>
        <Button variant="fab" color="primary" aria-label="add"
          style={style.fab}
          onClick={() => this.openForm({})}>
          <AddIcon />
        </Button>
      </div>
    );
  }
}

BooksList.propTypes = {
  onInit: PropTypes.func.isRequired,
  onDel: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  books: PropTypes.array.isRequired,
  error: PropTypes.string.isRequired,
};

export default BooksList;
