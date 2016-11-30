require('babel-register');

const Server = require('./Server').default;

new Server().start();
