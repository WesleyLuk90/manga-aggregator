import { RepositoryListFactory, Fields } from 'manga-api';
import MangaRoutes from '../../../server/manga/MangaRoutes';

fdescribe('MangaRoutes', () => {
    let routes;
    let res;
    let req;
    let mangaService;
    let mockRepository;

    function getResponse() {
        expect(res.json).toHaveBeenCalled();
        const response = res.json.calls.first().args[0];
        return JSON.parse(JSON.stringify(response));
    }

    beforeEach(() => {
        req = { query: {} };
        res = jasmine.createSpyObj('response', ['json', 'send']);
        mangaService = jasmine.createSpyObj('mangaService', ['loadMangas', 'getPreviewImage']);
        const repositoryList = RepositoryListFactory.create();
        mockRepository = repositoryList.get('MockRepository');
        routes = new MangaRoutes(mangaService, repositoryList);
    });

    it('should search repositories', (done) => {
        req.query = {
            repository: 'MockRepository',
            includedTags: ['A', 'B', 'C'],
            excludedTags: ['D', 'E', 'F'],
            searchFields: { Title: 'ABC' },
        };
        spyOn(mockRepository, 'search').and.callThrough();
        routes.search(req, res)
            .then(() => {
                const response = getResponse();
                expect(response.manga).toEqual([{ url: 'mock://manga' }]);
                expect(mangaService.loadMangas).toHaveBeenCalled();
                expect(mockRepository.search).toHaveBeenCalled();

                const filter = mockRepository.search.calls.first().args[0];
                expect(filter.getIncludedTags()).toEqual(['A', 'B', 'C']);
                expect(filter.getExcludedTags()).toEqual(['D', 'E', 'F']);
                expect(filter.getSearchField(Fields.TITLE)).toBe('ABC');
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
