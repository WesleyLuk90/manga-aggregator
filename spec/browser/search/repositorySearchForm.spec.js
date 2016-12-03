describe('repositorySearchForm', () => {
    let $compile;
    beforeEach(inject((_$compile_) => { $compile = _$compile_; }));

    let $rootScope;
    beforeEach(inject((_$rootScope_) => { $rootScope = _$rootScope_; }));

    let component;
    let resultsSpy;
    beforeEach(() => {
        $rootScope.capabilities = {};
        $rootScope.repository = 'some-repo';
        resultsSpy = $rootScope.resultsSpy = jasmine.createSpy('resultsSpy');
        component = $compile('<repository-search-form capabilities="capabilities" repository="repository" on-results="resultsSpy(results)"></repository-search-form>')($rootScope);
        $rootScope.$digest();
    });

    it('should have a search button', () => {
        expect(component).toContainElement('button.search');
    });

    describe('search', () => {
        let mangaService;
        beforeEach(inject((_mangaService_) => { mangaService = _mangaService_; }));
        let $q;
        beforeEach(inject((_$q_) => { $q = _$q_; }));
        it('should search', () => {
            const searchResults = [{ results: 'stuff' }];
            const searchSpy = spyOn(mangaService, 'search').and.returnValue($q.resolve(searchResults));
            component.find('button.search').trigger('click');

            expect(searchSpy).toHaveBeenCalled();
            const options = searchSpy.calls.first().args[0];
            expect(options.repository).toBe('some-repo');
            $rootScope.$digest();

            expect(resultsSpy).toHaveBeenCalled();
            expect(resultsSpy.calls.first().args[0]).toBe(searchResults);
        });
    });
});
