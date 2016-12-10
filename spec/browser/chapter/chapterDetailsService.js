describe('chapterDetailsService', () => {
    let chapterDetailsService;
    beforeEach(inject((_chapterDetailsService_) => { chapterDetailsService = _chapterDetailsService_; }));

    let updateService;
    beforeEach(inject((_updateService_) => { updateService = _updateService_; }));

    it('should check if a chapter is loaded', () => {
        expect(chapterDetailsService.isChapterLoaded({ url: 'blah' })).toBe(false);
        updateService.emit({ event: 'chapter', payload: { chapterHandle: { url: 'blah' } } });
        expect(chapterDetailsService.isChapterLoaded({ url: 'blah' })).toBe(true);
        expect(chapterDetailsService.getChapter({ url: 'blah' })).toEqual({ chapterHandle: { url: 'blah' } });
    });
});
