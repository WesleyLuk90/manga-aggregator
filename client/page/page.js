import angular from 'angular';
import appContainer from './appContainer';
import pageImageService from './pageImageService';

export default angular
    .module('mangaApp.page', [
        appContainer,
        pageImageService,
    ]).name;
