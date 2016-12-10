import BottleFactory from '../../../toolkit/BottleFactory';
import DatabaseReset from '../../../toolkit/DatabaseReset';

describe('LoadMangaJobFactory', () => {
    let factory;
    let job;
    let mangaResource;
    let mangaService;
    let chapterService;
    let mangaEvents;
    let chapterEvents;

    beforeEach((done) => {
        const bottle = BottleFactory.create();
        factory = bottle.container.loadMangaJobFactory;
        mangaResource = bottle.container.mangaResource;
        mangaService = bottle.container.mangaService;
        chapterService = bottle.container.chapterService;
        mangaEvents = bottle.container.mangaEvents;
        chapterEvents = bottle.container.chapterEvents;
        job = factory.create('some-id');

        DatabaseReset.reset()
            .catch(fail)
            .then(done);
    });

    it('should create jobs', () => {
        expect(job.getMangaId()).toBe('some-id');
    });

    describe('job', () => {
        it('should load manga and chapters', (done) => {
            const manga = {
                mangaHandle: { url: 'mock://manga' },
                chapters: [{ url: 'mock://chapter-a' }, { url: 'mock://chapter-b' }],
            };
            spyOn(mangaResource, 'getById').and.returnValue(Promise.resolve(manga));
            spyOn(mangaService, 'loadManga').and.returnValue(Promise.resolve(manga));
            spyOn(chapterService, 'getOrLoadChapter').and.returnValues(Promise.resolve(manga.chapters[0]), Promise.resolve(manga.chapters[1]));
            spyOn(mangaEvents, 'emitManga');
            spyOn(chapterEvents, 'emitChapter');

            job.run()
                .then(() => {
                    expect(mangaResource.getById).toHaveBeenCalledWith('some-id');
                    expect(mangaService.loadManga).toHaveBeenCalledWith({ url: 'mock://manga' });
                    expect(mangaEvents.emitManga).toHaveBeenCalledWith(manga);
                    manga.chapters.forEach((chapter) => {
                        expect(chapterService.getOrLoadChapter).toHaveBeenCalledWith(chapter);
                        expect(chapterEvents.emitChapter).toHaveBeenCalledWith(chapter);
                    });
                })
                .catch(fail)
                .then(done);
        });
    });
});
