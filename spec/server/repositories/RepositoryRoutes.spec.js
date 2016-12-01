import RepositoryRoutes from '../../../server/repositories/RepositoryRoutes';

describe('router', () => {
    let routes;
    let res;
    let req;

    function getResponse() {
        expect(res.json).toHaveBeenCalled();
        const response = res.json.calls.first().args[0];
        return JSON.parse(JSON.stringify(response));
    }

    beforeEach(() => {
        req = { body: {} };
        res = jasmine.createSpyObj('response', ['json']);
        routes = new RepositoryRoutes();
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

    it('should search repositories', (done) => {
        req.body = {
            repository: 'MockRepository',
        };
        routes.searchRepository(req, res)
            .then(() => {
                const response = getResponse();
                expect(response.manga).toEqual([{ url: 'mock://manga' }]);
            })
            .catch(fail)
            .then(done);
    });
});
