import io from 'socket.io';

export default class SocketService {
    load(server) {
        this.socket = io(server);
    }

    emit(event, payload) {
        if (typeof event !== 'string') {
            throw new Error('Event must be a string');
        }
        if (typeof payload !== 'object' || payload == null) {
            throw new Error('Payload must be an object');
        }
        if (this.socket) {
            this.socket.emit(event, payload);
        }
    }
}

SocketService.$name = 'socketService';
