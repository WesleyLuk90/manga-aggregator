describe('chapterService', () => {
    let chapterService;
    beforeEach(inject((_chapterService_) => { chapterService = _chapterService_; }));

    let updateService;
    beforeEach(inject((_updateService_) => { updateService = _updateService_; }));

    it('should check if a chapter is loaded', () => {
        expect(chapterService.isChapterLoaded({ url: 'blah' })).toBe(false);
        updateService.emit({ event: 'chapter', payload: { chapterHandle: { url: 'blah' } } });
        expect(chapterService.isChapterLoaded({ url: 'blah' })).toBe(true);
        expect(chapterService.getChapter({ url: 'blah' })).toEqual({ chapterHandle: { url: 'blah' } });
    });
});
