import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { LoginContainer } from './containers/Login';
import { UsersListContainer } from './containers/UsersList';
import { BooksListContainer } from './containers/BooksList';
import { BooksOrderContainer } from './containers/BooksOrder';
import { ProfileContainer } from './containers/Profile';
import { fetch } from './actions/auth';
import NavMenu from './components/NavMenu';
import Notifier from './components/Notifier';

export class App extends React.Component {
  constructor(props) {
    super(props);
  }
  activeUser() {
    return this.context.store.getState().auth.user;
  }
  isLogged() {
    const user = this.activeUser();
    return !!user && !!user.name;
  }
  isAdmin() {
    return this.activeUser().role === 'manager';
  }
  ifLogged(element) {
    return this.isLogged() ? element : <Redirect push to="/" />;
  }
  ifAdmin(element) {
    return this.isLogged() && this.isAdmin() ? element : <Redirect push to="/" />;
  }
  logout() {
    this.context.store.dispatch(fetch('logout'));
  }
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        {this.isLogged() && <NavMenu user={this.activeUser()} />}
        <Switch>
          <Route exact path="/" component={LoginContainer} />
          <Route path="/register" component={LoginContainer} />
          <Route path="/logout" render={() => {
            this.logout();
            return <Redirect push to="/" />;
          }} />
          <Route path='/users' render={() => this.ifAdmin(<UsersListContainer />)} />
          <Route path='/books' render={() => this.ifAdmin(<BooksListContainer />)} />
          <Route path='/order' render={() => this.ifLogged(<BooksOrderContainer />)} />
          <Route path='/profile' render={() => this.ifLogged(<ProfileContainer />)} />
        </Switch>
        <Notifier />
      </React.Fragment>
    );
  }
}

App.contextTypes = {
  store: PropTypes.object.isRequired
};
