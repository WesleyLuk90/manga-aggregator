import RepositoryRoutes from '../../../server/repositories/RepositoryRoutes';
import mangaApi from 'manga-api';

describe('router', () => {
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
        req = { body: {} };
        res = jasmine.createSpyObj('response', ['json']);
        mangaService = jasmine.createSpyObj('mangaService', ['loadMangas']);
        routes = new RepositoryRoutes(mangaService, mangaApi.RepositoryListFactory.create());
    });

    it('should create a router', () => {
        expect(routes.getRouter()).toBeTruthy();
    });

    it('should list repositories', () => {
        routes.listRepositories(req, res);
        const response = getResponse();
        expect(response.repositories).toBeTruthy();
        expect(response.repositories).toContain('MangaFox');
    });

    it('should get repository capabilities', () => {
        req.body = {
            repository: 'MockRepository',
        };
        routes.repositoryCapabilities(req, res);

        const response = getResponse();
        expect(response.capabilities).toBeTruthy();
        expect(response.capabilities.tagOptions).toBe(null);
    });

    it('should search repositories', (done) => {
        req.body = {
            repository: 'MockRepository',
        };
        routes.searchRepository(req, res)
            .then(() => {
                const response = getResponse();
                expect(response.manga).toEqual([{ url: 'mock://manga' }]);
                expect(mangaService.loadMangas).toHaveBeenCalled();
            })
            .catch(fail)
            .then(done);
    });
});
