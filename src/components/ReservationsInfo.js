import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableRow, TableCell, TableBody, TableHead } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class ReservationsInfo extends React.Component {
  render() {
    const { props } = this;
    return (
      <Dialog
        open={props.open}
        onClose={() => props.onClose()}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Book reservation info</DialogTitle>
        <DialogContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Check in</TableCell>
                <TableCell>Check out</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Name</TableCell>
              </TableRow>
            </TableHead>
            {props.data &&
              <TableBody>
                {
                  props.data.map(
                    (item, idx) =>
                      <TableRow key={idx}>
                        <TableCell>{item.checkin}</TableCell>
                        <TableCell>{item.checkout}</TableCell>
                        <TableCell>{item.user}</TableCell>
                        <TableCell>{item.bname}</TableCell>
                      </TableRow>
                  )
                }
              </TableBody>
            }
          </Table>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.onClose()} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ReservationsInfo.propTypes = {
  onClose: PropTypes.func.isRequired,
  data: PropTypes.array,
  open: PropTypes.bool
};

export default ReservationsInfo;