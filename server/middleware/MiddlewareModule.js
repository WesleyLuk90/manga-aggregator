import SocketService from './SocketService';
import WebpackMiddleware from './WebpackMiddleware';
import BodyParserMiddleware from './BodyParserMiddleware';

export default class MiddlewareModule {
    static register(bottle) {
        bottle.register(SocketService);
        bottle.register(WebpackMiddleware);
        bottle.register(BodyParserMiddleware);
    }
}
