import angular from 'angular';

class PageImageService {
    constructor(updateService) {
        'ngInject';

        this.loadedPages = new Map();

        updateService.subscribe('page', page => this.addPage(page));
    }

    addPage(page) {
        this.loadedPages.set(page.pageHandle.url, page);
    }

    isLoaded(pageHandle) {
        this.checkPageHandle(pageHandle);
        return this.loadedPages.has(pageHandle.url);
    }

    getPageUrl(pageHandle) {
        this.checkPageHandle(pageHandle);
        const page = this.loadedPages.get(pageHandle.url);
        return `/api/page/get-page/${page._id}`;
    }

    checkPageHandle(pageHandle) {
        if (typeof pageHandle.url !== 'string') {
            throw new Error('Expected a page handle');
        }
    }
}

export default angular.module('mangaApp.pageImageService', [])
    .service('pageImageService', PageImageService)
    .name;
