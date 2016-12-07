import { ChapterHandle, Chapter } from 'manga-api';
import BottleFactory from '../../../toolkit/BottleFactory';

describe('ChapterResource', () => {
    let chapterResource;

    beforeEach(() => {
        const bottle = BottleFactory.create();
        chapterResource = bottle.container.chapterResource;
    });

    it('should create chapters', (done) => {
        const chapterHandle = ChapterHandle.fromUrl('mock://chapter');
        const chapter = new Chapter(chapterHandle)
            .setChapter('1')
            .setVolume('2')
            .setTitle('3')
            .setPages([
                { url: 'mock://page' },
                { url: 'mock://page' },
            ]);

        chapterResource.create(chapter)
            .then((createdChapter) => {
                const chapterObj = createdChapter.toObject();
                expect(chapterObj._id).toBeTruthy();
                expect(chapterObj.chapter).toBe('1');
                expect(chapterObj.volume).toBe('2');
                expect(chapterObj.title).toBe('3');
                expect(chapterObj.chapterHandle.url).toBe('mock://chapter');
                expect(chapterObj.pages.length).toBe(2);
                chapterObj.pages.forEach((page) => {
                    expect(page.url).toBe('mock://page');
                });
            })
            .catch(fail)
            .then(done);
    });

    it('should get chapters', (done) => {
        const chapterHandle = ChapterHandle.fromUrl('mock://chapter');
        const chapter = new Chapter(chapterHandle);
        chapterResource.create(chapter)
            .then(createdChapter => chapterResource.getById(createdChapter._id))
            .then(foundChapter => expect(foundChapter).toBeTruthy())
            .catch(fail)
            .then(done);
    });

    it('should not get non-existant chapters', (done) => {
        chapterResource.getById('aaaaaaaaaaaaaaaaaaaaaaaa')
            .then(chapter => expect(chapter).toBeNull())
            .catch(fail)
            .then(done);
    });
});
