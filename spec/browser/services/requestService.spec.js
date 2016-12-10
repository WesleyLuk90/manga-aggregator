describe('requestService', () => {
    let requestService;
    beforeEach(inject((_requestService_) => { requestService = _requestService_; }));

    let $http;
    beforeEach(inject((_$http_) => { $http = _$http_; }));

    it('should send get requests', () => {
        const getSpy = spyOn($http, 'get').and.returnValue(Promise.resolve());
        requestService.get('/hello/world', { some: 'data' });

        expect(getSpy).toHaveBeenCalledWith('/hello/world', { params: { some: 'data' }, paramSerializer: '$httpParamSerializerJQLike' });
    });

    it('should send post requests', () => {
        const postSpy = spyOn($http, 'post').and.returnValue(Promise.resolve());
        requestService.post('/hello/world', { some: 'data' });

        expect(postSpy).toHaveBeenCalledWith('/hello/world', { some: 'data' });
    });
});
