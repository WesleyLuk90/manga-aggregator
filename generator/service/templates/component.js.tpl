import angular from 'angular';

class <%= component_upper %> {
    constructor() {
        'ngInject';
    }
}

export default angular.module('mangaApp.<%= component_camel %>', [])
    .service('<%= component_camel %>', <%= component_upper %>)
    .name;
