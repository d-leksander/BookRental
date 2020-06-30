import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormControl, InputLabel, Select, MenuItem, Avatar } from '@material-ui/core';

const style = {
  avatarContainer: {
    textAlign: 'center'
  },
  avatar: {
    height: 64,
    width: 64,
    textTransform: 'uppercase',
    display: 'inline-flex',
    fontSize: 28
  }
};

export class UserForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      name: '', password: '', role: 'user'
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      this.setState(nextProps.data);
    }
    return null;
  }
  handleChange(e, item) {
    this.setState({
      [item]: e.target.value
    });
  }
  render() {
    const { state, props } = this;
    return (
      <Dialog
        open={props.open}
        onClose={() => props.onClose()}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit user info</DialogTitle>
        <DialogContent>
          <div style={style.avatarContainer}>
            <Avatar style={style.avatar}>{state.name[0]}</Avatar>
          </div>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="User name"
            type="text"
            value={state.name}
            onChange={(e) => this.handleChange(e, 'name')}
            fullWidth
          />
          <TextField
            margin="dense"
            id="password"
            label="User password"
            type="password"
            value={state.password}
            onChange={(e) => this.handleChange(e, 'password')}
            fullWidth
          />
          <FormControl>
            <InputLabel htmlFor="role-simple">Role</InputLabel>
            <Select
              value={state.role}
              onChange={(e) => this.handleChange(e, 'role')}
              inputProps={{
                name: 'role',
                id: 'role-simple',
              }}
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="manager">Manager</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.onClose()} color="primary">
            Cancel
          </Button>
          <Button onClick={() => props.onClose(state)} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

UserForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  data: PropTypes.object,
  open: PropTypes.bool
};
