import fs from 'fs';
import Q from 'q';
import path from 'path';
import _ from 'lodash';
import { PageHandle } from 'manga-api';

export default class PageService {

    constructor(pageResource, mangaPaths, repositoryList, chapterResource, mangaImageService) {
        this.pageResource = pageResource;
        this.mangaPaths = mangaPaths;
        this.repositoryList = repositoryList;
        this.chapterResource = chapterResource;
        this.mangaImageService = mangaImageService;
    }

    getOrLoadPage(pageHandle) {
        this.checkHandle(pageHandle);
        return this.pageIsLoaded(pageHandle)
            .then((isLoaded) => {
                if (isLoaded) {
                    return Promise.resolve();
                }
                return this.loadPage(pageHandle);
            });
    }

    checkHandle(pageHandle) {
        if (!(pageHandle instanceof PageHandle)) {
            throw new Error('Expected a PageHandle');
        }
    }

    pageIsLoaded(pageHandle) {
        return this.pageResource
            .getByHandle(pageHandle)
            .then((foundPage) => {
                if (!foundPage || !foundPage.fileName) {
                    return false;
                }
                return this.pageImageExists(pageHandle);
            });
    }

    pageImageExists(pageHandle) {
        if (typeof pageHandle.url !== 'string') {
            throw new Error('Expected a page handle');
        }
        return this.pageResource.getByHandle(pageHandle)
            .then(page => this.mangaPaths.getPageImagePath(page))
            .then(pageImagePath =>
                Q.ninvoke(fs, 'stat', pageImagePath)
                .then(() => true)
                .catch(() => false));
    }

    loadPage(pageHandle) {
        this.checkHandle(pageHandle);
        return this.requestRepositoryPage(pageHandle)
            .then(page =>
                this.createPageFileName(page)
                .then(fileName =>
                    this.getChapterPath(pageHandle)
                    .then(chapterPath => this.downloadPageAndSaveFilename(page, chapterPath, fileName))));
    }

    requestRepositoryPage(pageHandle) {
        const repo = this.repositoryList.getRepositoryForHandle(pageHandle);
        return repo.getPage(pageHandle);
    }

    getChapterPath(pageHandle) {
        if (typeof pageHandle.url !== 'string') {
            throw new Error('Expected a page handle');
        }
        return this.chapterResource.getByPage(pageHandle)
            .then(chapter => this.mangaPaths.getChapterPath(chapter));
    }

    updatePageFilename(page, fileName) {
        if (!fileName.match(/\w+\.\w+/)) {
            throw new Error(`Invalid page filename ${fileName}`);
        }
        page.fileName = fileName;
        return this.pageResource.upsert(page);
    }

    downloadPageTo(page, destinationPath) {
        return this.mangaImageService
            .downloadImage(page.imageUrl)
            .then(downloadedImage =>
                this.mangaImageService.writeBuffer(downloadedImage, destinationPath));
    }

    createPageFileName(page) {
        return this.chapterResource
            .getByPage(page.pageHandle)
            .then((chapter) => {
                const ext = this.mangaPaths.getImageExtension(page.imageUrl);
                const pageNumber = this.getPageNumber(chapter, page);
                return `${pageNumber}.${ext}`;
            });
    }

    getPageNumber(chapter, page) {
        const index = _.findIndex(chapter.pages, p => p.url === page.pageHandle.url);
        if (index === -1) {
            throw new Error('Failed to find page number');
        }
        return index + 1;
    }

    downloadPageAndSaveFilename(page, chapterPath, fileName) {
        return this.downloadPageTo(page, path.join(chapterPath, fileName))
            .then(() => this.updatePageFilename(page, fileName));
    }
}

PageService.$name = 'pageService';
PageService.$inject = ['pageResource', 'mangaPaths', 'repositoryList', 'chapterResource', 'mangaImageService'];
