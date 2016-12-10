import BottleFactory from '../../../toolkit/BottleFactory';

describe('ChapterRoutes', () => {
    let chapterRoutes;

    beforeEach(() => {
        const bottle = BottleFactory.create();
        chapterRoutes = bottle.container.chapterRoutes;
    });

    it('should check some value', () => {
        expect(chapterRoutes).toBe(true);
    });
});
