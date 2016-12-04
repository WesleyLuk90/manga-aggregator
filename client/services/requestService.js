import angular from 'angular';

class RequestService {
    constructor($http) {
        'ngInject';

        this.$http = $http;
    }

    get(url, data) {
        return this.$http
            .get(url, {
                params: data,
                paramSerializer: '$httpParamSerializerJQLike',
            })
            .then(res => res.data);
    }
}

export default angular.module('mangaApp.requestService', [])
    .service('requestService', RequestService)
    .name;
