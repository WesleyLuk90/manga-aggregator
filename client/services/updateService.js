import angular from 'angular';
import io from 'socket.io-client';
import Rx from 'rx';

class UpdateService {
    constructor($rootScope) {
        'ngInject';

        this.$rootScope = $rootScope;
        this.eventStream = new Rx.Subject();
    }

    start() {
        this.socket = io(`${window.location.protocol}//${window.location.host}`);
        this.socket.on('connect', () => {
            console.log('Socket is now connected');
        });
        this.socket.on('event', (data) => {
            this.$rootScope.$apply(() => {
                this.eventStream.onNext(data);
            });
        });
    }

    subscribe(eventType, callback) {
        return this.eventStream
            .filter(event => event.event === eventType)
            .map(event => event.payload)
            .subscribe(callback);
    }
}

export default angular.module('mangaApp.services.updateService', [])
    .service('updateService', UpdateService)
    .name;
