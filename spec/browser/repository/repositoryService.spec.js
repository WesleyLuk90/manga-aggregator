describe('repositoryService', () => {
    let repositoryService;

    beforeEach(inject((_repositoryService_) => { repositoryService = _repositoryService_; }));

    it('should exist', () => {
        expect(repositoryService).toBeTruthy();
    });
});
