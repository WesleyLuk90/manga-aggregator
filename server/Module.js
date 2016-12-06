import Bottle from 'bottlejs';
import RepositoryRoutes from './repositories/RepositoryRoutes';
import MangaService from './manga/MangaService';
import RepositoryList from './manga/RepositoryList';
import Manga from './manga/Manga';
import Connection from './db/Connection';
import MangaEvents from './manga/MangaEvents';
import MangaResource from './manga/MangaResource';
import SocketService from './middleware/SocketService';
import Server from './server/Server';
import WebpackMiddleware from './middleware/WebpackMiddleware';
import Configuration from './server/Configuration';
import MangaRoutes from './manga/MangaRoutes';
import FileStorage from './db/FileStorage';
import MangaImageService from './manga/MangaImageService';
import MangaPaths from './manga/MangaPaths';
import BodyParserMiddleware from './middleware/BodyParserMiddleware';
import ExecutorService from './job/ExecutorService';
import LoadMangaJobFactory from './job/LoadMangaJobFactory';

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
        bottle.register(Manga);
        bottle.register(MangaEvents);
        bottle.register(Connection);
        bottle.register(MangaResource);
        bottle.register(SocketService);
        bottle.register(WebpackMiddleware);
        bottle.register(Configuration);
        bottle.register(MangaRoutes);
        bottle.register(FileStorage);
        bottle.register(MangaImageService);
        bottle.register(MangaPaths);
        bottle.register(BodyParserMiddleware);
        bottle.register(ExecutorService);
        bottle.register(LoadMangaJobFactory);
        return bottle;
    }
}
