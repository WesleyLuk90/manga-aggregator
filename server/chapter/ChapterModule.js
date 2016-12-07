import ChapterResource from './ChapterResource';
import Chapter from './Chapter';

export default class ChapterModule {
    static register(bottle) {
        bottle.register(ChapterResource);
        bottle.register(Chapter);
    }
}
