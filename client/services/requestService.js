import angular from 'angular';

class RequestService {
    constructor($http) {
        'ngInject';

        this.$http = $http;
    }

    get(url) {
        return this.$http.get(url)
            .then(res => res.data);
    }
}

export default angular.module('mangaApp.requestService', [])
    .service('requestService', RequestService)
    .name;
