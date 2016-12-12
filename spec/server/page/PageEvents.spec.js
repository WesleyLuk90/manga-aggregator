import BottleFactory from '../../../toolkit/BottleFactory';

describe('PageEvents', () => {
    let pageEvents;
    let socketService;
    let Page;

    beforeEach(() => {
        const bottle = BottleFactory.create();
        pageEvents = bottle.container.pageEvents;
        socketService = bottle.container.socketService;
        Page = bottle.container.Page;
    });

    it('should emit a page', () => {
        spyOn(socketService, 'emit');
        const page = new Page({ pageHandle: { url: 'mock://page' } });
        pageEvents.emitPage(page);
        expect(socketService.emit).toHaveBeenCalledWith('page', page.toObject());
    });
});
