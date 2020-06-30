const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const tus = require('tus-node-server');
const api = require('./api');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
const compiler = webpack(webpackConfig);
const app = express();
const port = 8080;

const server = new tus.Server();
server.datastore = new tus.FileStore({
  path: '/dist/files'
});

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true, publicPath: webpackConfig.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));

app.use(bodyParser.json());
app.use('/api', api);
app.use(express.static(path.join(__dirname, '../dist')));

const uploadApp = express();
uploadApp.all('*', server.handle.bind(server));
app.use('/upload', uploadApp);

app.listen(port);

console.log('react test server listening on ' + port);
