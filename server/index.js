require('babel-register');

const Module = require('./Module').default;
const myModule = new Module().create();
const server = myModule.container.server;
server.start();

const executorService = myModule.container.executorService;
executorService.start();
