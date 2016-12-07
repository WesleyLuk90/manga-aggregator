import { ChapterHandle } from 'manga-api';
import BottleFactory from '../../../toolkit/BottleFactory';

describe('ChapterService', () => {
    let chapterService;
    let chapterResource;

    beforeEach(() => {
        const bottle = BottleFactory.create();
        chapterService = bottle.container.chapterService;
        chapterResource = bottle.container.chapterResource;
    });

    it('should load a chapter', (done) => {
        const handle = ChapterHandle.fromUrl('mock://chapter');
        chapterService.load(handle)
            .then((chapter) => {
                expect(chapter.mangaHandle.url).toBe('mock://chapter');
                return chapterResource.getById(chapter._id);
            })
            .then((chapter) => {
                expect(chapter.mangaHandle.url).toBe('mock://chapter');
            })
            .catch(fail)
            .then(done);
    });
});
