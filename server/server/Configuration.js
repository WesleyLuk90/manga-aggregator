import path from 'path';

export default class Configuration {
    liveWebpackBuild() {
        return true;
    }
    getConnectionString() {
        return 'mongodb://localhost/manga_aggregator';
    }

    getStorageFolder() {
        return path.join(__dirname, '../storage');
    }
}

Configuration.$name = 'configuration';
Configuration.$inject = [];
