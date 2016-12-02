require('babel-register');

const Module = require('./Module').default;

const server = new Module().create().container.server;

server.start();
