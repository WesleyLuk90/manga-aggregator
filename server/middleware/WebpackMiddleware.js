import webpackMiddleware from 'webpack-dev-middleware';
import webpack from 'webpack';

export default class WebpackMiddleware {
    load(app) {
        const config = require('../../webpack.config');
        const compiler = webpack(config);
        const middleware = webpackMiddleware(compiler, { publicPath: '/' });
        app.use(middleware);
    }
}
