import angular from 'angular';

class ViewPageController {
    constructor(pageImageService) {
        'ngInject';

        this.pageImageService = pageImageService;
    }

    getPageHandle() {
        return this.chapter.pages[this.pageIndex];
    }

    isLoaded() {
        return this.pageImageService.isLoaded(this.getPageHandle());
    }

    getPageUrl() {
        return this.pageImageService.getPageUrl(this.getPageHandle());
    }
}

export default angular.module('mangaApp.viewPage', [])
    .component('viewPage', {
        bindings: {
            chapter: '<',
            pageIndex: '<',
        },
        template: require('./viewPage.pug')(),
        controller: ViewPageController,
    })
    .name;
