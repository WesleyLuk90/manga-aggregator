import angular from 'angular';

class <%= component_upper %>Controller {
    constructor() {
        'ngInject';
    }
}

export default angular.module('mangaApp.<%= component_camel %>', [])
    .component('<%= component_camel %>', {
        template: require('./<%= component_camel %>.pug')(),
        controller: <%= component_upper %>Controller,
    })
    .name;
