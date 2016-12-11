import BottleFactory from '../../../toolkit/BottleFactory';

xdescribe('ChapterRoutes', () => {
    let chapterRoutes;

    beforeEach(() => {
        const bottle = BottleFactory.create();
        chapterRoutes = bottle.container.chapterRoutes;
    });

    it('should check some value', () => {
        expect(chapterRoutes).toBe(true);
    });
});
