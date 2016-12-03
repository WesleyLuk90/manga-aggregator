import webpackMiddleware from 'webpack-dev-middleware';
import webpack from 'webpack';

export default class WebpackMiddleware {
    constructor(configuration) {
        this.configuration = configuration;
    }
    load(app) {
        if (this.configuration.liveWebpackBuild()) {
            const config = require('../../webpack.config');
            const compiler = webpack(config);
            const middleware = webpackMiddleware(compiler, { publicPath: '/assets/' });
            app.use(middleware);
        }
    }
}

WebpackMiddleware.$name = 'webpackMiddleware';
WebpackMiddleware.$inject = ['configuration'];
