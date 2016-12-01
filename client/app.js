import angular from 'angular';
import page from './page/page';
import home from './home/home';
import updates from './updates/updates';
import favorites from './favorites/favorites';
import reading from './reading/reading';
import search from './search/search';
import settings from './settings/settings';

require('angular-ui-router');

const app = angular
    .module('mangaApp', [
        page,
        home,
        updates,
        favorites,
        reading,
        search,
        settings,
        'ui.router',
    ]);
app.config(($locationProvider) => {
    $locationProvider.html5Mode(true);
});

angular.bootstrap(document.body, ['mangaApp'], { strictDi: true });
