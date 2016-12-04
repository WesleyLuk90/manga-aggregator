import angular from 'angular';
import mangaService from './mangaService';
import mangaDetailsService from './mangaDetailsService';
import mangaCard from './mangaCard';

export default angular
    .module('mangaApp.manga', [
        mangaService,
        mangaDetailsService,
        mangaCard,
    ])
    .name;
