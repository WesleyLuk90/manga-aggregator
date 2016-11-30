import angular from 'angular';
import page from './page/page';
import home from './home/home';

require('angular-ui-router');

angular.module('mangaApp', [
    page,
    home,
    'ui.router',
]);

angular.bootstrap(document.body, ['mangaApp'], { strictDi: true });
