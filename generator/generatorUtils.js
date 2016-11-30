const path = require('path');
const _ = require('lodash');

function fixSlashes(filePath) {
    return filePath.replace(/\\/g, '/');
}

function stripExtension(filePath) {
    return filePath.replace(/\.[a-z]+$/i, '');
}

function dirname(filePath) {
    return path.dirname(filePath);
}

function makeRelativePath(fromFile, toFile) {
    return path.relative(dirname(fromFile), toFile);
}

function relativePathTo(fromFile, toFile) {
    return fixSlashes(stripExtension(makeRelativePath(fromFile, toFile)));
}

function getBasename(namespace) {
    return path.basename(namespace);
}

function hasExtension(basename) {
    return basename.match(/\./);
}

function isProperCase(basename) {
    return basename === _.upperFirst(_.camelCase(basename));
}

function getNamespaceErrors(namespace) {
    const basename = getBasename(namespace);
    if (hasExtension(basename)) {
        return `Basename should not have an extension, got '${basename}'`;
    }
    return false;
}

module.exports = {
    getBasename,
    relativePathTo,
    getNamespaceErrors,
};
