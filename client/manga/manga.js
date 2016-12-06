import angular from 'angular';
import mangaService from './mangaService';
import mangaDetailsService from './mangaDetailsService';
import mangaCard from './mangaCard';
import mangaInfo from './mangaInfo';
import mangaPage from './mangaPage';

export default angular
    .module('mangaApp.manga', [
        mangaService,
        mangaDetailsService,
        mangaCard,
        mangaInfo,
        mangaPage,
    ])
    .name;
