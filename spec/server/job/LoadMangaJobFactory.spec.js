import BottleFactory from '../../../toolkit/BottleFactory';

describe('LoadMangaJobFactory', () => {
    let factory;
    let job;
    let mangaResource;
    let mangaService;

    beforeEach(() => {
        const bottle = BottleFactory.create();
        factory = bottle.container.loadMangaJobFactory;
        mangaResource = bottle.container.mangaResource;
        mangaService = bottle.container.mangaService;
        job = factory.create('some-id');
    });

    it('should create jobs', () => {
        expect(job.getMangaId()).toBe('some-id');
    });

    xdescribe('job', () => {
        it('should load manga and chapters', (done) => {
            const manga = {
                mangaHandle: { url: 'mock://manga' },
                chapters: [{ url: 'mock://chapter-a' }, { url: 'mock://chapter-b' }],
            };
            const getByIdSpy = spyOn(mangaResource, 'getById').and.returnValue(Promise.resolve(manga));
            const loadMangaSpy = spyOn(mangaService, 'loadManga').and.returnValue(Promise.resolve(manga));

            job.run()
                .then(() => {
                    expect(getByIdSpy).toHaveBeenCalledWith('some-id');
                    expect(loadMangaSpy).toHaveBeenCalledWith({ url: 'mock://manga' });
                    expect();
                })
                .catch(fail)
                .then(done);
        });
    });
});
