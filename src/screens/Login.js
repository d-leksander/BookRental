import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Button, TextField, Card, CardContent, Grid, CardActions, CardMedia, CardHeader, Avatar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import login from '../assets/library.jpg';
import logo from '../assets/logo.png';

const styles = {
  root: {
    flexGrow: 1,
    height: '100vh'
  },
  flex: {
    flexGrow: 1,
  },
  card: {
    width: 550,
    maxWidth: '150%',
  },
  media: {
    height: 0,
    paddingTop: '100%'
  },

  content: {
    flexDirection: 'row',
    display: 'flex',
  },
  actions: {
    justifyContent: 'space-between',
  }
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: ''
    };
  }
  isLogged() {
    return !!this.props.auth.user.name;
  }
  handleChange(e, item) {
    this.setState({
      [item]: e.target.value
    });
  }
  render() {
    const { classes } = this.props;
    const redirectUrl = this.props.auth.user.role === 'manager' ? '/books' : '/order';
    return this.isLogged() ? <Redirect to={redirectUrl} /> : (


      <Grid container>

        <Grid item xs={12}>
          <Grid container justify="center" alignItems="center" direction="row" className={classes.root}>


            <Card className={classes.card}>



              <CardHeader
                avatar={
                  <Avatar src={logo} />
                }
                title="E-LIBRARY"
                subheader="Book..., rent..., read..."
              />
              <CardMedia
                className={classes.media}
                image={login}
                title="E-biblioteka"
              />
              <form noValidate autoComplete="off" onSubmit={() => this.props.onLogin(this.state)}>
                <CardContent className={classes.content}>
                  <TextField
                    className={classes.flex}
                    placeholder="Enter your Username"
                    label="Username"
                    onChange={(e) => this.handleChange(e, 'name')}
                  />
                  <TextField
                    className={classes.flex}
                    type="password"
                    label="Password"
                    onChange={(e) => this.handleChange(e, 'password')}
                  />
                </CardContent>
                <CardActions className={classes.actions}>
                  <Button type="submit" variant="contained" color="primary" >
                    Login
                  </Button>
                  <Button variant="contained" onClick={() => this.props.onRegister(this.state)} >
                    Register
                  </Button>
                </CardActions>
              </form>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);