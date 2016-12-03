const mongoose = require('mongoose');

export default function createConnection(configuration) {
    mongoose.Promise = Promise;
    return mongoose.createConnection(configuration.getConnectionString());
}

createConnection.$name = 'connection';
createConnection.$inject = ['configuration'];
