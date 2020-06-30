import React from 'react';
import PropTypes from 'prop-types';
import { Button, Paper } from '@material-ui/core';
import { UserForm } from '../components/UserForm';
import Selectable from '../components/Selectable';
import ReservationsInfo from '../components/ReservationsInfo';

const style = {
  margin: 12
};

class UsersList extends React.Component {

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
        id: 'name',
        title: 'User name'
      },
      {
        id: 'role',
        title: 'User role'
      },
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
    this.setState({ form: { open: true, data: this.props.users[idx] } });
  }

  closeForm(data) {
    this.setState({ form: { open: false } });
    if (data) this.props.onEdit(data);
  }

  openDetails(idx) {
    this.setState({ details: { open: true, data: this.props.users[idx].reservations } });
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
            rows={props.users}
            selected={state.selected}
            onSelect={selected => this.select(selected)}
            onDelete={idx => this.delete(idx)}
            onEdit={idx => this.openForm(idx)}
            onDetails={idx => this.openDetails(idx)}
          />
          <div>{props.error}</div>
          <UserForm
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
      </div>
    );
  }
}

UsersList.propTypes = {
  onInit: PropTypes.func.isRequired,
  onDel: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  error: PropTypes.string.isRequired,
};

export default UsersList;
