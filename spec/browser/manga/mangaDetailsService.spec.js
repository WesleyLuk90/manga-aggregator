describe('mangaDetailsService', () => {
    let mangaDetailsService;

    beforeEach(inject((_mangaDetailsService_) => { mangaDetailsService = _mangaDetailsService_; }));

    it('should check if manga is loaded', () => {
        const myMangaHandle = { url: 'abc123' };
        expect(mangaDetailsService.isLoaded(myMangaHandle)).toBe(false);
        mangaDetailsService.addManga({ mangaHandle: myMangaHandle });
        expect(mangaDetailsService.isLoaded(myMangaHandle)).toBe(true);
    });
    it('should get manga by handle', () => {
        const myMangaHandle = { url: 'abc123' };
        const manga = { mangaHandle: myMangaHandle };
        mangaDetailsService.addManga(manga);
        expect(mangaDetailsService.getDetails(myMangaHandle)).toBe(manga);
    });

    it('should check if manga is loaded by id', () => {
        const myMangaHandle = { url: 'abc123' };
        expect(mangaDetailsService.isMangaIdLoaded('some-id')).toBe(false);
        mangaDetailsService.addManga({ _id: 'some-id', mangaHandle: myMangaHandle });
        expect(mangaDetailsService.isMangaIdLoaded('some-id')).toBe(true);
    });

    it('should get manga by id', () => {
        const myMangaHandle = { url: 'abc123' };
        const manga = { _id: 'some-id', mangaHandle: myMangaHandle };
        mangaDetailsService.addManga(manga);
        expect(mangaDetailsService.getDetailsById('some-id')).toBe(manga);
    });
});
