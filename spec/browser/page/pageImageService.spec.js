describe('pageImageService', () => {
    let pageImageService;
    beforeEach(inject((_pageImageService_) => { pageImageService = _pageImageService_; }));

    let updateService;
    beforeEach(inject((_updateService_) => { updateService = _updateService_; }));

    it('should should check if a page is loaded', () => {
        expect(pageImageService.isLoaded({ url: 'some-page-url' })).toBe(false);

        updateService.emit({ event: 'page', payload: { pageHandle: { url: 'some-page-url' } } });

        expect(pageImageService.isLoaded({ url: 'some-page-url' })).toBe(true);
    });

    it('should get a page url', () => {
        updateService.emit({ event: 'page', payload: { _id: 'my_page_id', pageHandle: { url: 'some-page-url' } } });
        expect(pageImageService.getPageUrl({ url: 'some-page-url' })).toBe('/api/page/get-page/my_page_id');
    });
});
