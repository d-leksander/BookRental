import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AppBar, Button, IconButton, Menu, MenuItem, Toolbar, Typography, Avatar } from '@material-ui/core';
import { Menu as MenuIcon, AccountCircle as AccountCircleIcon } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { DrawerMenu } from './DrawerMenu';
import logo from '../assets/logo.png';

const styles = theme => ({
  flex: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    width: 240,
  },
  profileIcon: {
    marginRight: theme.spacing.unit,
  },
  avatar: {
    marginRight: theme.spacing.unit,
  },
});

class NavMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      drawerMenu: false,
    };
  }
  handleMenu(event) {
    this.setState({ anchorEl: event.currentTarget });
  }
  handleClose() {
    this.setState({ anchorEl: null });
  }
  toggleDrawer() {
    this.setState({ drawerMenu: !this.state.drawerMenu });
  }
  isAdmin() {
    return this.props.user.role === 'manager';
  }
  render() {
    const { classes, user } = this.props;
    const open = Boolean(this.state.anchorEl);
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            {this.isAdmin() ?
              <IconButton color="inherit" aria-label="Menu" onClick={() => this.toggleDrawer()}>
                <MenuIcon />
              </IconButton>
              :
              <Avatar src={logo} className={classes.avatar} component={Link} to='/' />
            }
            <Typography variant="title" color="inherit" className={classes.flex}>
              E-LIBRARY BOOK RENTAL
            </Typography>
            <div>
              <Button
                variant="contained"
                aria-owns={open ? 'menu-appbar' : null}
                aria-haspopup="true"
                onClick={(e) => this.handleMenu(e)}
                color="inherit"
              >
                <AccountCircleIcon className={classes.profileIcon} />
                {user.name}
              </Button>
              <Menu
                id="menu-appbar"
                anchorEl={this.state.anchorEl}
                open={open}
                onClose={() => this.handleClose()}
              >
                {!this.isAdmin() &&
                  <MenuItem component={Link} to='/profile' onClick={() => this.handleClose()}>
                    My reservations
                  </MenuItem>
                }
                <MenuItem component={Link} to='/logout' onClick={() => this.handleClose()}>
                  Logout
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <DrawerMenu
          open={this.state.drawerMenu}
          onDrawerClose={() => this.toggleDrawer()}
          classes={{
            paper: classes.drawerPaper,
          }} />
      </div >
    );
  }
}

NavMenu.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavMenu);