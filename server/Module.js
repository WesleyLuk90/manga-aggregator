import Bottle from 'bottlejs';
import RepositoryRoutes from './repositories/RepositoryRoutes';
import RepositoryList from './manga/RepositoryList';
import Connection from './db/Connection';
import Server from './server/Server';
import Configuration from './server/Configuration';
import FileStorage from './db/FileStorage';
import ExecutorService from './job/ExecutorService';
import LoadMangaJobFactory from './job/LoadMangaJobFactory';
import ChapterModule from './chapter/ChapterModule';
import MangaModule from './manga/MangaModule';
import MiddlewareModule from './middleware/MiddlewareModule';

export default class Module {
    constructor() {
        Bottle.config.strict = true;
    }
    create() {
        const bottle = new Bottle();
        bottle.register(RepositoryRoutes);
        bottle.register(RepositoryList);
        bottle.register(Server);
        bottle.register(Connection);
        bottle.register(LoadMangaJobFactory);
        bottle.register(Configuration);
        bottle.register(FileStorage);
        bottle.register(ExecutorService);
        ChapterModule.register(bottle);
        MangaModule.register(bottle);
        MiddlewareModule.register(bottle);
        return bottle;
    }
}
