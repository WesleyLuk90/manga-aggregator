import Bottle from 'bottlejs';
import RepositoryRoutes from './repositories/RepositoryRoutes';
import MangaService from './manga/MangaService';
import RepositoryList from './manga/RepositoryList';
import Manga from './manga/Manga';
import Connection from './db/Connection';
import MangaEvents from './manga/MangaEvents';
import { connectionConfigFactory } from './db/ConnectionConfig';
import MangaResource from './manga/MangaResource';
import SocketService from './middleware/SocketService';
import Server from './server/Server';
import WebpackMiddleware from './middleware/WebpackMiddleware';
import Configuration from './server/Configuration';

export default class Module {
    constructor() {
        Bottle.config.strict = true;
    }
    create() {
        const bottle = new Bottle();
        bottle.register(RepositoryRoutes);
        bottle.register(connectionConfigFactory);
        bottle.register(MangaService);
        bottle.register(RepositoryList);
        bottle.register(Server);
        bottle.register(Manga);
        bottle.register(MangaEvents);
        bottle.register(Connection);
        bottle.register(MangaResource);
        bottle.register(SocketService);
        bottle.register(WebpackMiddleware);
        bottle.register(Configuration);
        return bottle;
    }
}
