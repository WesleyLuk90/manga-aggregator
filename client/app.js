/* eslint-disable no-unused-vars */

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
        'ui.router',
    ]);
app.config(($locationProvider) => {
    $locationProvider.html5Mode(true);
});
app.run((updateService) => {
    updateService.start();
});

angular.bootstrap(document.body, ['mangaApp'], { strictDi: true });
