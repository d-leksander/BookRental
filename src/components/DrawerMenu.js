import React from 'react';
import { PropTypes } from 'prop-types';
import { Drawer, Divider, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@material-ui/core';
import { ChevronLeft as ChevronLeftIcon, LibraryBooks as LibraryBooksIcon, People as PeopleIcon } from '@material-ui/icons';
import { Link } from 'react-router-dom';

export class DrawerMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      options: [
        { url: '/login', label: 'Login' },
        { url: '/list', label: 'Users' },
        { url: '/books', label: 'Books' },
        { url: '/add', label: 'Add' }
      ]
    };
  }
  handleMenu(event) {
    this.setState({ anchorEl: event.currentTarget });
  }
  handleClose() {
    this.setState({ anchorEl: null });
  }
  render() {
    return (
      <Drawer
        variant="persistent"
        anchor="left"
        open={this.props.open}
      >
        <div>
          <IconButton onClick={() => this.props.onDrawerClose()}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button component={Link} to="/books" onClick={() => this.props.onDrawerClose()}>
            <ListItemIcon>
              <LibraryBooksIcon />
            </ListItemIcon>
            <ListItemText primary="Books List" />
          </ListItem>
          <ListItem button component={Link} to="/users" onClick={() => this.props.onDrawerClose()}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
        </List>
      </Drawer>
    );
  }
}

DrawerMenu.propTypes = {
  open: PropTypes.bool,
  onDrawerClose: PropTypes.func.isRequired,
};
