import path from 'path';
import url from 'url';

export default class MangaPaths {
    constructor(fileStorage) {
        this.fileStorage = fileStorage;
    }

    getMangaFolder(manga) {
        return this.fileStorage.getFolder(['manga', `${manga.name}-${manga._id}`]);
    }

    getPreviewImagePath(manga) {
        const ext = this.getImageExtension(manga.previewImageUrl);
        return this.getMangaFolder(manga)
            .then(mangaFolder => path.join(mangaFolder, `preview-image.${ext}`));
    }

    getImageExtension(webUrl) {
        const urlObject = url.parse(webUrl);
        const match = urlObject.path.match(/\.([a-z]+)$/);
        if (!match) {
            return 'jpg';
        }
        const ext = match[1];
        if (ext === 'jpg' || ext === 'png' || ext === 'jpeg') {
            return ext;
        }
        return 'jpg';
    }
}

MangaPaths.$name = 'mangaPaths';
MangaPaths.$inject = ['fileStorage'];
