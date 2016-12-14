import angular from 'angular';

class PageImageService {
    constructor(updateService) {
        'ngInject';

        this.loadedPages = new Map();

        updateService.subscribe('page', (page) => this.addPage(page));
    }

    addPage(page) {
        this.loadedPages.set(page._id, page);
    }

    isLoaded(pageId) {
        this.checkPageId(pageId);
        return this.loadedPages.has(pageId);
    }

    getPageUrl(pageId) {
        this.checkPageId(pageId);
        return `/api/page/get-page/${pageId}`;
    }

    checkPageId(pageId) {
        if (typeof pageId !== 'string') {
            throw new Error('Expected a page id');
        }
    }
}

export default angular.module('mangaApp.pageImageService', [])
    .service('pageImageService', PageImageService)
    .name;
