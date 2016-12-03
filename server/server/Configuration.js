export default class Configuration {
    liveWebpackBuild() {
        return true;
    }
    getConnectionString() {
        return 'mongodb://localhost/manga_aggregator';
    }
}

Configuration.$name = 'configuration';
Configuration.$inject = [];
