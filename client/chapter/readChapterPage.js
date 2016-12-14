import angular from 'angular';

class ReadChapterPageController {
    constructor(pageNavigationService, chapterDetailsService) {
        'ngInject';

        this.pageNavigationService = pageNavigationService;
        this.chapterDetailsService = chapterDetailsService;
    }

    getCurrentPageIndex() {
        return this.pageNavigationService.getCurrentPageIndex();
    }

    getCurrentChapter() {
        return this.chapterDetailsService.getChapterById(this.pageNavigationService.getChapterId());
    }

    isLoaded() {
        return this.chapterDetailsService.isChapterLoadedById(this.pageNavigationService.getChapterId());
    }
}

export default angular.module('mangaApp.readChapterPage', [])
    .config(($stateProvider) => {
        'ngInject';

        $stateProvider.state({
            name: 'read-chapter',
            url: '/read/:chapterId/:pageNumber',
            template: '<read-chapter-page />',
            onEnter: ($stateParams, chapterService, pageNavigationService) => {
                'ngInject';

                if ($stateParams.chapterId) {
                    chapterService.requestLoadChapter($stateParams.chapterId);
                }
                pageNavigationService.enableHotkeys();
            },
            onExit: (pageNavigationService) => {
                pageNavigationService.disableHotkeys()
            },
        });
    })
    .component('readChapterPage', {
        template: require('./readChapterPage.pug')(),
        controller: ReadChapterPageController,
    })
    .name;
