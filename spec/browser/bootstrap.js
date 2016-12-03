window.jQuery = require('jquery');

require('../../client/app');
require('angular-mocks');

const helpersContext = require.context('./helpers', true, /.*\.js/);

helpersContext.keys().forEach((path) => {
    helpersContext(path);
});
