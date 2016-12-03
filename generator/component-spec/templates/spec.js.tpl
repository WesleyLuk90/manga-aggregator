describe('<%= component_camel %>', () => {
    let $compile;
    beforeEach(inject((_$compile_) => { $compile = _$compile_; }));

    let $rootScope;
    beforeEach(inject((_$rootScope_) => { $rootScope = _$rootScope_; }));

    let component;
    beforeEach(() => {
        component = $compile('<<%= component_kebab %>></<%= component_kebab %>>')($rootScope);
        $rootScope.$digest();
    });

    it('should check some value', () => {
        expect(component).toBe(false);
    });
});
