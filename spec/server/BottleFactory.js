import Module from '../../server/Module';

export default class BottleFactory {
    static create() {
        const bottle = new Module().create();
        bottle.constant('connectionConfig', {
            getConnectionString() {
                return 'mongodb://localhost/manga_aggregator_test';
            }
        });
        return bottle;
    }
}
