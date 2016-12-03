describe('mangaService', () => {
    let mangaService;

    beforeEach(inject((_mangaService_) => { mangaService = _mangaService_; }));

    it('should check search arguments', () => {
        expect(() => mangaService.search({ invalid_argument: 'stuff' })).toThrowError(/Requires option 'repository'/);
        expect(() => mangaService.search({ repository: 'some repo', invalid_argument: 'stuff' })).toThrowError(/Invalid option 'invalid_argument'/);
    });
});
