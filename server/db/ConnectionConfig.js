export class ConnectionConfig {
    static getConnectionString() {
        return 'mongodb://localhost/manga-aggregator';
    }
}

export function connectionConfigFactory() {
    return ConnectionConfig;
}

connectionConfigFactory.$name = 'connectionConfig';
