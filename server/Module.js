import Bottle from 'bottlejs';
import RepositoryRoutes from './repositories/RepositoryRoutes';
import RepositoryList from './manga/RepositoryList';
import Connection from './db/Connection';
import Server from './server/Server';
import Configuration from './server/Configuration';
import FileStorage from './db/FileStorage';
import ChapterModule from './chapter/ChapterModule';
import MangaModule from './manga/MangaModule';
import MiddlewareModule from './middleware/MiddlewareModule';
import JobModule from './job/JobModule';
import PageModule from './page/PageModule';

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
        bottle.register(Configuration);
        bottle.register(FileStorage);

        PageModule.register(bottle);
        JobModule.register(bottle);
        ChapterModule.register(bottle);
        MangaModule.register(bottle);
        MiddlewareModule.register(bottle);
        return bottle;
    }
}
