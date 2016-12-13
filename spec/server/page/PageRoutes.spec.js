import BottleFactory from '../../../toolkit/BottleFactory';

describe('PageRoutes', () => {
    let pageRoutes;
    let pageService;
    let res;
    let req;

    beforeEach(() => {
        const bottle = BottleFactory.create();
        pageRoutes = bottle.container.pageRoutes;
        pageService = bottle.container.pageService;
        res = jasmine.createSpyObj('response', ['sendFile']);
        req = {};
    });

    it('should get page files', (done) => {
        req.params = {
            pageId: 'some-page-id',
        };
        spyOn(pageService, 'getPagePath').and.returnValue(Promise.resolve('/some/file/path'));
        pageRoutes.getPage(req, res)
            .then(() => {
                expect(pageService.getPagePath).toHaveBeenCalledWith('some-page-id');
                expect(res.sendFile).toHaveBeenCalledWith('/some/file/path');
            })
            .catch(fail)
            .then(done);
    });

    it('should create a router', () => {
        expect(pageRoutes.getRouter()).toBeTruthy();
    });
});
