import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableHead, TableRow, TableCell, TableBody, IconButton, Icon } from '@material-ui/core';

class Profile extends React.Component {
  componentDidMount() {
    this.props.onInit(this.context.store.getState().auth.user);
  }

  render() {
    const { props } = this;
    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Check in</TableCell>
              <TableCell>Check out</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          {props.user.reservations &&
            <TableBody>
              {
                props.user.reservations.map(
                  (item, idx) =>
                    <TableRow key={idx}>
                      <TableCell>{item.checkin}</TableCell>
                      <TableCell>{item.checkout}</TableCell>
                      <TableCell>{item.bname}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => props.onCancel({ ...item, user: props.user.name })}>
                          <Icon>delete_icon</Icon>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                )
              }
            </TableBody>
          }
        </Table>
      </div>
    );
  }
}

Profile.propTypes = {
  onInit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  error: PropTypes.string.isRequired,
};

Profile.contextTypes = {
  store: PropTypes.object.isRequired
};

export default Profile;
