describe('pageImageService', () => {
    let pageImageService;
    beforeEach(inject((_pageImageService_) => { pageImageService = _pageImageService_; }));

    let updateService;
    beforeEach(inject((_updateService_) => { updateService = _updateService_; }));

    it('should should check if a page is loaded', () => {
        expect(pageImageService.isLoaded('some-page-id')).toBe(false);

        updateService.emit({ event: 'page', payload: { _id: 'some-page-id' } });

        expect(pageImageService.isLoaded('some-page-id')).toBe(true);
    });

    it('should get a page url', () => {
        expect(pageImageService.getPageUrl('some-page-id')).toBe('/api/page/get-page/some-page-id');
    });
});
