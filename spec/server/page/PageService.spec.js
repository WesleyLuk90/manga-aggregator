import BottleFactory from '../../../toolkit/BottleFactory';

describe('PageService', () => {
    let pageService;

    beforeEach(() => {
        const bottle = BottleFactory.create();
        pageService = bottle.container.pageService;
    });

    it('should check some value', () => {
        expect(pageService).toBe(true);
    });
});
