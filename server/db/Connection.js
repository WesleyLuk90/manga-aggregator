const mongoose = require('mongoose');

export default function createConnection(connectionConfig) {
    mongoose.Promise = Promise;
    return mongoose.createConnection(connectionConfig.getConnectionString());
}

createConnection.$name = 'connection';
createConnection.$inject = ['connectionConfig'];
