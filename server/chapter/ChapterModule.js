import ChapterResource from './ChapterResource';
import Chapter from './Chapter';
import ChapterService from './ChapterService';
import ChapterEvents from './ChapterEvents';
import ChapterJobService from './ChapterJobService';
import ChapterRoutes from './ChapterRoutes';

export default class ChapterModule {
    static register(bottle) {
        bottle.register(ChapterResource);
        bottle.register(Chapter);
        bottle.register(ChapterService);
        bottle.register(ChapterJobService);
        bottle.register(ChapterEvents);
        bottle.register(ChapterRoutes);
    }
}
