import bodyParser from 'body-parser';

export default class BodyParserMiddleware {
    load(app) {
        app.use(bodyParser.json());
    }
}

BodyParserMiddleware.$name = 'bodyParserMiddleware';
BodyParserMiddleware.$inject = [];
