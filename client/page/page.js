import angular from 'angular';
import appContainer from './appContainer';
import pageImageService from './pageImageService';
import viewPage from './viewPage';

export default angular
    .module('mangaApp.page', [
        appContainer,
        pageImageService,
        viewPage,
    ]).name;
