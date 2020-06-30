import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export class ReservationForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    const currentDate = new Date().toJSON().slice(0,10);
    this.state = {
      bookId: 0, checkin: currentDate, checkout: currentDate
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data.id) {
      this.setState({bookId: nextProps.data.id});
    }
    return null;
  }
  handleChange(e, item) {
    this.setState({
      [item]: e.target.value
    });
    if (this.state.checkin > this.state.checkout) {
      this.setState(
        {checkout: this.state.checkin}
      );
    }
  }
  render() {
    const { state, props } = this;
    return (
      <Dialog
        open={props.open}
        onClose={() => props.onClose()}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Book reservation</DialogTitle>
        <DialogContent>
          <form noValidate>
            <TextField
              id="date"
              label="Checkin date"
              type="date"
              defaultValue={state.checkin}
              onChange={(e) => this.handleChange(e, 'checkin')}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="date"
              label="Checkout date"
              type="date"
              defaultValue={state.checkout}
              onChange={(e) => this.handleChange(e, 'checkout')}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.onClose()} color="primary">
            Cancel
          </Button>
          <Button onClick={() => props.onClose(state)} color="primary">
            Reserve book
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ReservationForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  data: PropTypes.object,
  open: PropTypes.bool
};
