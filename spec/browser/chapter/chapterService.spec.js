describe('chapterService', () => {
    let chapterService;
    beforeEach(inject((_chapterService_) => { chapterService = _chapterService_; }));

    let requestService;
    beforeEach(inject((_requestService_) => { requestService = _requestService_; }));

    it('should request a chapter load', (done) => {
        spyOn(requestService, 'post').and.returnValue(Promise.resolve());
        chapterService.requestLoadChapter('some chapter id')
            .then(() => expect(requestService.post).toHaveBeenCalledWith('/api/chapter/request-load', { chapterId: 'some chapter id' }))
            .catch(fail)
            .then(done);
    });

    it('should not request the same chapter twice', (done) => {
        spyOn(requestService, 'post').and.returnValue(Promise.resolve());
        chapterService.requestLoadChapter('some chapter id')
            .then(() => chapterService.requestLoadChapter('some chapter id'))
            .then(() => expect(requestService.post.calls.count()).toBe(1))
            .catch(fail)
            .then(done);
    });
});
