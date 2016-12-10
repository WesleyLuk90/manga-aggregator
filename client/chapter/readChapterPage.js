import angular from 'angular';

class ReadChapterPageController {
    constructor($stateParams) {
        'ngInject';

        console.log($stateParams.chapterId);
        console.log($stateParams.pageNumber);
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
