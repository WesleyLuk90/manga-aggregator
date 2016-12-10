import angular from 'angular';
import chapterService from './chapterService';
import chapterLink from './chapterLink';

export default angular
    .module('mangaApp.chapter', [
        chapterService,
        chapterLink,
    ])
    .name;
