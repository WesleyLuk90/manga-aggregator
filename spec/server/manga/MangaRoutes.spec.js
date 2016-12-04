import mangaApi from 'manga-api';
import MangaRoutes from '../../../server/manga/MangaRoutes';

describe('MangaRoutes', () => {
    let routes;
    let res;
    let req;
    let mangaService;

    function getResponse() {
        expect(res.json).toHaveBeenCalled();
        const response = res.json.calls.first().args[0];
        return JSON.parse(JSON.stringify(response));
    }

    beforeEach(() => {
        req = { query: {} };
        res = jasmine.createSpyObj('response', ['json', 'send']);
        mangaService = jasmine.createSpyObj('mangaService', ['loadMangas', 'getPreviewImage']);
        routes = new MangaRoutes(mangaService, mangaApi.RepositoryListFactory.create());
    });

    it('should search repositories', (done) => {
        req.query = {
            repository: 'MockRepository',
        };
        routes.search(req, res)
            .then(() => {
                const response = getResponse();
                expect(response.manga).toEqual([{ url: 'mock://manga' }]);
                expect(mangaService.loadMangas).toHaveBeenCalled();
            })
            .catch(fail)
            .then(done);
    });

    it('should get preview images', (done) => {
        req.params = {
            id: 'some-id',
        };
        const response = Buffer.alloc(0);
        mangaService.getPreviewImage.and.returnValue(Promise.resolve(response));
        routes.getPreviewImage(req, res)
            .then(() => {
                expect(mangaService.getPreviewImage).toHaveBeenCalledWith('some-id');
                expect(res.send).toHaveBeenCalledWith(response);
            })
            .catch(fail)
            .then(done);
    });
});
