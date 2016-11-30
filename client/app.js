import angular from 'angular';
import page from './page/page';
import home from './home/home';

require('angular-ui-router');
const app = angular
    .module('mangaApp', [
        page,
        home,
        'ui.router',
    ]);
app.config(($locationProvider) => {
    $locationProvider.html5Mode(true);
});

angular.bootstrap(document.body, ['mangaApp'], { strictDi: true });
