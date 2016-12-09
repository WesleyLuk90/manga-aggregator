import { MangaHandle } from 'manga-api';
import BottleFactory from '../../../toolkit/BottleFactory';

describe('MangaService', () => {
    let mangaService;
    let mangaEvents;
    let bottle;
    let repositoryList;

    beforeEach(() => {
        bottle = BottleFactory.create();
        mangaEvents = bottle.container.mangaEvents;
        spyOn(mangaEvents, 'emitManga');
        mangaService = bottle.container.mangaService;
        repositoryList = bottle.container.repositoryList;
    });

    it('should load manga and emit events', (done) => {
        const search = Promise.resolve([
            MangaHandle.fromUrl('mock://a'),
            MangaHandle.fromUrl('mock://b'),
        ]);

        spyOn(repositoryList.get('MockRepository'), 'search').and.returnValue(search);

        repositoryList.get('MockRepository')
            .search()
            .then(mangaHandles => mangaService.loadMangas(mangaHandles).toPromise())
            .then(() => {
                expect(mangaEvents.emitManga.calls.count()).toBe(2);
            })
            .catch(fail)
            .then(done);
    });

    it('should emit events with no subscribers', (done) => {
        const search = Promise.resolve([
            MangaHandle.fromUrl('mock://a'),
        ]);

        spyOn(repositoryList.get('MockRepository'), 'search').and.returnValue(search);

        mangaEvents.emitManga.and.callFake(done);

        repositoryList.get('MockRepository')
            .search()
            .then(mangaHandles => mangaService.loadMangas(mangaHandles))
            .catch(fail);
    });

    it('should load mangas', (done) => {
        const handles = [MangaHandle.fromUrl('mock://manga'), MangaHandle.fromUrl('mock://manga')];
        mangaService.loadMangas(handles)
            .toPromise()
            .then(() => {
                expect(mangaEvents.emitManga.calls.count()).toBe(2);
            })
            .catch(fail)
            .then(done);
    });

    describe('getPreviewImage', () => {
        let myManga;
        let mangaResource;
        let mangaImageService;
        let imageData;
        beforeEach(() => {
            const Manga = bottle.container.Manga;
            myManga = new Manga();
            mangaResource = bottle.container.mangaResource;
            spyOn(mangaResource, 'getById').and.returnValue(Promise.resolve(myManga));

            mangaImageService = bottle.container.mangaImageService;
            imageData = Buffer.alloc(0);
            spyOn(mangaImageService, 'getPreviewImage').and.returnValue(Promise.resolve(imageData));
        });

        it('should get the preview image', (done) => {
            mangaService.getPreviewImage('some id')
                .then((returnedImage) => {
                    expect(mangaResource.getById).toHaveBeenCalledWith('some id');
                    expect(mangaImageService.getPreviewImage).toHaveBeenCalledWith(myManga);
                    expect(returnedImage).toBe(imageData);
                })
                .catch(fail)
                .then(done);
        });
    });

    it('should load manga', (done) => {
        const mangaHandle = { url: 'mock://manga' };
        mangaService.loadManga(mangaHandle)
            .catch(fail)
            .then(done);
    });
});
