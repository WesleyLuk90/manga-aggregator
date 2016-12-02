import Bottle from 'bottlejs';
import RepositoryRoutes from './repositories/RepositoryRoutes';
import Server from './Server';
import MangaService from './manga/MangaService';
import RepositoryList from './manga/RepositoryList';

export default class Module {
    constructor() {
        Bottle.config.strict = true;
    }
    create() {
        const bottle = new Bottle();
        bottle.register(RepositoryRoutes);
        bottle.register(MangaService);
        bottle.register(RepositoryList);
        bottle.register(Server);
        return bottle;
    }
}
