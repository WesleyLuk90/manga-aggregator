import BottleFactory from '../../../toolkit/BottleFactory';

describe('MangaEvents', () => {
    let mangaEvents;
    let socketService;
    let Manga;

    beforeEach(() => {
        const bottle = BottleFactory.create();
        mangaEvents = bottle.container.mangaEvents;
        socketService = bottle.container.socketService;
        Manga = bottle.container.Manga;
    });

    it('should emit manga', () => {
        spyOn(socketService, 'emit');
        const myManga = new Manga();
        mangaEvents.emitManga(myManga);
        expect(socketService.emit).toHaveBeenCalledWith('manga', myManga.toObject());
    });
});
