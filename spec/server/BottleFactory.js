import Module from '../../server/Module';
import Configuration from '../../server/server/Configuration';

export default class BottleFactory {
    static create() {
        const bottle = new Module().create();
        bottle.service('configuration', class extends Configuration {
            getConnectionString() {
                return 'mongodb://localhost/manga_aggregator_test';
            }
            liveWebpackBuild() {
                return false;
            }
        });
        return bottle;
    }
}
