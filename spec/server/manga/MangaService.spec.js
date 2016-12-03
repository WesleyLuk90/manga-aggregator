import { MangaHandle } from 'manga-api';
import BottleFactory from '../BottleFactory';

describe('MangaService', () => {
    let mangaService;
    let mangaEvents;
    let bottle;
    let repositoryList;

    beforeEach(() => {
        bottle = BottleFactory.create();
        mangaEvents = jasmine.createSpyObj('mangaEvents', ['emitLoadedManga']);
        bottle.constant('mangaEvents', mangaEvents);
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
                expect(mangaEvents.emitLoadedManga.calls.count()).toBe(2);
            })
            .catch(fail)
            .then(done);
    });
});
