import { Server } from 'http';
import io from 'socket.io-client';
import SocketService from '../../../server/middleware/SocketService';

describe('SocketService', () => {
    it('should throw an error when emit is called with invalid parameters', () => {
        const socketService = new SocketService();

        expect(() => socketService.emit(null)).toThrowError();
        expect(() => socketService.emit('stuff', null)).toThrowError();
        expect(() => socketService.emit('stuff', 10)).toThrowError();
        expect(() => socketService.emit('stuff', {})).not.toThrowError();
    });

    describe('integration test', () => {
        it('should send message', (done) => {
            const socketService = new SocketService();
            const server = new Server();
            socketService.load(server);
            server.listen(0, '127.0.0.1', (err) => {
                expect(err).toBeFalsy();
                const clientSocket = io(`http://127.0.0.1:${server.address().port}`);
                clientSocket.on('connect', () => {
                    socketService.emit('hello', { hello: 'world' });
                });
                clientSocket.on('error', e => fail(e));
                clientSocket.on('event', (event) => {
                    expect(event).toEqual({ event: 'hello', payload: { hello: 'world' } });
                    clientSocket.disconnect();
                    server.close(() => {
                        done();
                    });
                });
            });
        });
    });
});
