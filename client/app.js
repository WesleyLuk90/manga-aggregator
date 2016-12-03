/* eslint-disable no-unused-vars, import/first */
window.jQuery = require('jquery');

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import page from './page/page';
import home from './home/home';
import updates from './updates/updates';
import favorites from './favorites/favorites';
import reading from './reading/reading';
import search from './search/search';
import settings from './settings/settings';
import services from './services/services';
import repositories from './repositories/repositories';
import manga from './manga/manga';

const app = angular
    .module('mangaApp', [
        page,
        home,
        updates,
        favorites,
        reading,
        search,
        settings,
        services,
        repositories,
        manga,
        'ui.router',
    ]);
app.config(($locationProvider) => {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false,
    });
});
app.run((updateService) => {
    updateService.start();
});

window.jQuery(() =>
    angular.bootstrap(document.body, ['mangaApp'], { strictDi: true }));
