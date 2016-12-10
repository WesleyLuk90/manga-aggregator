describe('chapterLink', () => {
    let $compile;
    beforeEach(inject((_$compile_) => { $compile = _$compile_; }));

    let $rootScope;
    beforeEach(inject((_$rootScope_) => { $rootScope = _$rootScope_; }));

    let component;
    let chapter;
    let manga;
    beforeEach(() => {
        chapter = {};
        manga = {};
        $rootScope.chapter = chapter;
        $rootScope.manga = manga;
        component = $compile('<chapter-link chapter="chapter" manga="manga"></chapter-link>')($rootScope);
        $rootScope.$digest();
    });

    it('should display the manga name with no title', () => {
        chapter.volume = '10';
        chapter.chapter = '22';
        manga.name = 'My Manga';
        $rootScope.$digest();
        expect(component.text()).toMatch(/Vol: 10 — My Manga 22/);
    });

    it('should display the manga name with no volume', () => {
        chapter.chapter = '22';
        manga.name = 'My Manga';
        $rootScope.$digest();
        expect(component.text()).toMatch(/My Manga 22/);
    });

    it('should display the chapter and title', () => {
        chapter.volume = '10';
        chapter.chapter = '22';
        chapter.title = 'My First Chapter';
        $rootScope.$digest();
        expect(component.text()).toMatch(/Vol: 10 Ch: 22 — My First Chapter/);
    });
});
