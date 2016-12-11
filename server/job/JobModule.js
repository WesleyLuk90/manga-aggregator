import ExecutorService from './ExecutorService';
import LoadChapterJobFactory from './LoadChapterJobFactory';
import LoadMangaJobFactory from './LoadMangaJobFactory';

export default class JobModule {
    static register(bottle) {
        bottle.register(ExecutorService);
        bottle.register(LoadChapterJobFactory);
        bottle.register(LoadMangaJobFactory);
    }
}
