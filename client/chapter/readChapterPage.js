import angular from 'angular';

class ReadChapterPageController {
    constructor($stateParams, chapterDetailsService) {
        'ngInject';

        this.$stateParams = $stateParams;
        this.chapterDetailsService = chapterDetailsService;
    }

    getCurrentPageIndex() {
        if (this.$stateParams.pageNumber) {
            return this.$stateParams.pageNumber - 1;
        }
        return 0;
    }

    getCurrentChapter() {
        return this.chapterDetailsService.getChapterById(this.$stateParams.chapterId);
    }

    isLoaded() {
        return this.chapterDetailsService.isChapterLoadedById(this.$stateParams.chapterId);
    }
}

export default angular.module('mangaApp.readChapterPage', [])
    .config(($stateProvider) => {
        'ngInject';

        $stateProvider.state({
            name: 'read-chapter',
            url: '/read/:chapterId/:pageNumber',
            template: '<read-chapter-page />',
            onEnter: ($stateParams, chapterService) => {
                'ngInject';

                if ($stateParams.chapterId) {
                    chapterService.requestLoadChapter($stateParams.chapterId);
                }
            },
        });
    })
    .component('readChapterPage', {
        template: require('./readChapterPage.pug')(),
        controller: ReadChapterPageController,
    })
    .name;
