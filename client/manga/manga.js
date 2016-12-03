import angular from 'angular';
import mangaService from './mangaService';

export default angular
    .module('mangaApp.manga', [
        mangaService,
    ])
    .name;
