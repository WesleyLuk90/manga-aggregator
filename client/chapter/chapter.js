import angular from 'angular';
import chapterLink from './chapterLink';
import readChapterPage from './readChapterPage';
import chapterDetailsService from './chapterDetailsService';
import chapterService from './chapterService';

export default angular
    .module('mangaApp.chapter', [
        chapterDetailsService,
        chapterLink,
        readChapterPage,
        chapterService,
    ])
    .name;
