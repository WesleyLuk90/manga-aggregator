import BottleFactory from '../../../toolkit/BottleFactory';
import { LoadMangaJob } from '../../../server/job/LoadMangaJobFactory';

describe('MangaJobService', () => {
    let mangaJobService;
    let mangaEvents;
    let bottle;
    let executorService;

    beforeEach(() => {
        bottle = BottleFactory.create();
        mangaEvents = jasmine.createSpyObj('mangaEvents', ['emitLoadedManga']);
        bottle.constant('mangaEvents', mangaEvents);
        mangaJobService = bottle.container.mangaJobService;
        executorService = bottle.container.executorService;
    });

    it('should load manga by id', () => {
        const submitSpy = spyOn(executorService, 'submit');
        mangaJobService.loadMangaById('some-id');

        expect(submitSpy).toHaveBeenCalled();
        const job = submitSpy.calls.first().args[0];
        expect(job instanceof LoadMangaJob).toBe(true);
        expect(job.getMangaId()).toBe('some-id');
    });
});
