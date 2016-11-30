const LiveReloadPlugin = require('webpack-livereload-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

function isDev() {
    return process.env.NODE_ENV !== 'production';
}
const plugins = [];
if (isDev()) {
    plugins.push(new LiveReloadPlugin({ appendScriptTag: true }));
    // plugins.push(new ExtractTextPlugin('styles.css'));
}

function makeStyleLoader(matcher, loaders) {
    if (isDev()) {
        return {
            test: matcher,
            loaders: loaders,
        };
    } else {
        return {
            test: matcher,
            loader: ExtractTextPlugin.extract(...loaders),
        };
    }
}

module.exports = {
    progress: true,
    colors: true,
    devtool: isDev() ? 'eval-cheap-module-source-map' : undefined,
    entry: './client/main.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['', '.js'],
    },
    module: {
        loaders: [{
            test: /.js$/,
            exclude: /(node_modules|bower_components)/,
            loaders: ['ng-annotate', 'babel?presets=es2015'],
            // query: {
            //     presets: ['es2015'],
            // },
        }, {
            test: /\.html$/,
            loaders: ['html'],
        }, {
            test: /\.png$/,
            loader: 'url-loader?limit=100000',
        }, {
            test: /\.jpg$/,
            loader: 'file-loader',
        }, {
            test: /\.pug/,
            loader: 'pug-loader',
        }, {
            test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?&limit=10000&mimetype=application/font-woff',
        }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?&limit=10000&mimetype=application/octet-stream',
        }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file',
        }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?&limit=10000&mimetype=image/svg+xml',
        }],
    },
    htmlLoader: {
        attrs: false,
    },
    plugins,
};

module.exports.module.loaders.push(makeStyleLoader(/\.scss$/, ['style-loader', 'css-loader', 'sass-loader']));
module.exports.module.loaders.push(makeStyleLoader(/\.css/, ['style-loader', 'css-loader']));
