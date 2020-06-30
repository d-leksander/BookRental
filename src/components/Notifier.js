import React from 'react';
import { Snackbar, SnackbarContent } from '@material-ui/core';
import PropTypes from 'prop-types';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';

let openSnackbarFn;

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

class Notifier extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      message: '',
      type: 'info',
    };
  }

  componentDidMount() {
    openSnackbarFn = this.openSnackbar.bind(this);
  }

  handleSnackbarClose() {
    this.setState({
      open: false,
    });
  }

  openSnackbar({ message, type = 'info' }) {
    this.setState({ open: true, message, type });
  }

  render() {
    const { classes } = this.props;
    const Icon = variantIcon[this.state.type];

    return (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={3000}
        onClose={() => this.handleSnackbarClose()}
        open={this.state.open}
      >
        <SnackbarContent
          className={classes[this.state.type]}
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar" className={classes.message}>
              <Icon className={classes.icon} />
              <span id="snackbar-message-id" dangerouslySetInnerHTML={{ __html: this.state.message }} />
            </span>
          }
        />
      </Snackbar>
    );
  }
}

export function openSnackbar({ message }) {
  openSnackbarFn({ message });
}

Notifier.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Notifier);
