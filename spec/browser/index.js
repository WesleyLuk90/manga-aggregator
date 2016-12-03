require('./bootstrap');

beforeEach(window.module('mangaApp'));

const testsContext = require.context('.', true, /.spec.js/);
testsContext.keys().forEach((path) => {
    try {
        testsContext(path);
    } catch (err) {
        console.error('[ERROR] WITH SPEC FILE: ', path);
        console.error(err);
    }
});
