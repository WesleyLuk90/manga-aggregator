describe('repositoryService', () => {
    let repositoryService;

    beforeEach(inject((_repositoryService_) => { repositoryService = _repositoryService_; }));

    it('should check search arguments', () => {
        expect(() => repositoryService.search({ invalid_argument: 'stuff' })).toThrowError(/Invalid option 'invalid_argument'/);
    });
});
