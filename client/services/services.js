import angular from 'angular';
import updateService from './updateService';
import mangaService from './mangaService';
import requestService from './requestService';

export default angular.module('mangaApp.services', [
    updateService,
    mangaService,
    requestService,
]).name;
