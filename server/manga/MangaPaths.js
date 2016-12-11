import path from 'path';
import url from 'url';

export default class MangaPaths {
    constructor(fileStorage, mangaResource, chapterResource) {
        this.fileStorage = fileStorage;
        this.mangaResource = mangaResource;
        this.chapterResource = chapterResource;
    }

    getMangaFolder(manga) {
        return this.fileStorage.getFolder(['manga', `${manga.name}-${manga._id}`]);
    }

    getChapterPath(chapter) {
        return this.mangaResource.getByChapter(chapter.chapterHandle)
            .then(manga =>
                this.fileStorage
                .getFolder(['manga', `${manga.name}-${manga._id}`, `${chapter.chapter}-${chapter._id}`]));
    }

    buildPageImagePath(chapter, page) {
        if (!page.fileName) {
            throw new Error('Expected page to have a fileName');
        }
        return this.getChapterPath(chapter)
            .then(chapterPath => path.join(chapterPath, page.fileName));
    }

    getPreviewImagePath(manga) {
        const ext = this.getImageExtension(manga.previewImageUrl);
        return this.getMangaFolder(manga)
            .then(mangaFolder => path.join(mangaFolder, `preview-image.${ext}`));
    }

    getImageExtension(webUrl) {
        const urlObject = url.parse(webUrl);
        const match = urlObject.path.match(/\.([a-z]+)(\?.*)?$/);
        if (!match) {
            return 'jpg';
        }
        const ext = match[1];
        if (ext === 'jpg' || ext === 'png' || ext === 'jpeg') {
            return ext;
        }
        return 'jpg';
    }

    getPageImagePath(page) {
        if (!page.pageHandle) {
            throw new Error('Expected a page');
        }
        return this.chapterResource
            .getByPage(page.pageHandle)
            .then(chapter => this.buildPageImagePath(chapter, page));
    }
}

MangaPaths.$name = 'mangaPaths';
MangaPaths.$inject = ['fileStorage', 'mangaResource', 'chapterResource'];
