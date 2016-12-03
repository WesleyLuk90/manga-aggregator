import angular from 'angular';
import io from 'socket.io-client';

class UpdateService {
    constructor() {
        console.log('stuff');
    }
    start() {
        this.socket = io(window.location.toString());
        this.socket.on('connect', () => {
            console.log('connected');
        });
    }
}

export default angular.module('mangaApp.services.updateService', [])
    .service('updateService', UpdateService)
    .name;
