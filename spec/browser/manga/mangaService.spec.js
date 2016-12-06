describe('mangaService', () => {
    let mangaService;
    beforeEach(inject((_mangaService_) => { mangaService = _mangaService_; }));
    let requestService;
    beforeEach(inject((_requestService_) => { requestService = _requestService_; }));

    it('should check search arguments', () => {
        expect(() => mangaService.search({ invalid_argument: 'stuff' })).toThrowError(/Requires option 'repository'/);
        expect(() => mangaService.search({ repository: 'some repo', invalid_argument: 'stuff' })).toThrowError(/Invalid option 'invalid_argument'/);
    });

    describe('requestMangaUpdate', () => {
        it('should require an id', () => {
            expect(() => mangaService.requestMangaUpdate()).toThrowError(/Expected a string/);
            expect(() => mangaService.requestMangaUpdate(10)).toThrowError(/Expected a string/);
        });

        it('should send a request', (done) => {
            const postSpy = spyOn(requestService, 'post').and.returnValue(Promise.resolve({}));
            mangaService.requestMangaUpdate('some-id')
                .then(() =>
                    expect(postSpy).toHaveBeenCalledWith('/api/manga/request-update', { mangaId: 'some-id' })
                )
                .catch(fail)
                .then(done);
        });
    });
});
