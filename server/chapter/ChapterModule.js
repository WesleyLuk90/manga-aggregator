import ChapterResource from './ChapterResource';
import Chapter from './Chapter';
import ChapterService from './ChapterService';
import ChapterEvents from './ChapterEvents';

export default class ChapterModule {
    static register(bottle) {
        bottle.register(ChapterResource);
        bottle.register(Chapter);
        bottle.register(ChapterService);
        bottle.register(ChapterEvents);
    }
}
