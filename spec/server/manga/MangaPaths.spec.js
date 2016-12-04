import MangaPaths from '../../../server/manga/MangaPaths';

describe('MangaPaths', () => {
    let fileStorage;
    let mangaPaths;

    function normalizePath(pathToNormalize) {
        return pathToNormalize.replace(/\\/g, '/');
    }

    beforeEach(() => {
        fileStorage = jasmine.createSpyObj('fileStorage', ['getFolder']);
        fileStorage.getFolder.and.returnValue(Promise.resolve('/some/path/some manga-some-id'));
        mangaPaths = new MangaPaths(fileStorage);
    });

    it('should make manga paths', (done) => {
        mangaPaths.getMangaFolder({ name: 'some manga', _id: 'some-id' })
            .then(mangaFolder => expect(normalizePath(mangaFolder)).toBe('/some/path/some manga-some-id'))
            .catch(fail)
            .then(done);
    });

    it('should make image preview path', (done) => {
        mangaPaths.getPreviewImagePath({ name: 'some manga', _id: 'some-id', previewImageUrl: 'something.png' })
            .then(previewImagePath => expect(normalizePath(previewImagePath)).toBe('/some/path/some manga-some-id/preview-image.png'))
            .catch(fail)
            .then(done);
    });

    it('should make image preview path', (done) => {
        mangaPaths.getPreviewImagePath({ name: 'some manga', _id: 'some-id', previewImageUrl: 'something.jpg?something' })
            .then(previewImagePath => expect(normalizePath(previewImagePath)).toBe('/some/path/some manga-some-id/preview-image.jpg'))
            .catch(fail)
            .then(done);
    });
});
