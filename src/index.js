import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import ReactDOM from 'react-dom';
import { App } from './App';
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/orange';
import { MuiThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

let store = configureStore();

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </MuiThemeProvider>, document.getElementById('root'));

module.hot.accept();

