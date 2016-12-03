import angular from 'angular';
import updateService from './updateService';
import requestService from './requestService';

export default angular.module('mangaApp.services', [
    updateService,
    requestService,
]).name;
