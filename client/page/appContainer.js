import angular from 'angular';
import navigation from './navigation';

class AppContainer {

}

export default angular.module('mangaApp.container', [navigation])
    .component('appContainer', {
        template: require('./appContainer.pug')(),
        controller: AppContainer,
    })
    .name;
