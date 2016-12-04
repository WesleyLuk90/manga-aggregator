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
        res = jasmine.createSpyObj('response', ['json']);
        mangaService = jasmine.createSpyObj('mangaService', ['loadMangas']);
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
});
