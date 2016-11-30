const path = require('path');
const generators = require('yeoman-generator');
const generatorUtils = require('../generatorUtils');
const _ = require('lodash');

class Generator extends generators.Base {
    constructor(...args) {
        super(...args);
        this.argument('namespace', { type: String, required: true });
    }

    writing() {
        const namespace = this.namespace;
        const componentName = generatorUtils.getBasename(namespace);
        if (generatorUtils.getNamespaceErrors(namespace)) {
            this.abort = true;
            this.log.error(generatorUtils.getNamespaceErrors(namespace));
            return;
        }

        const data = {
            component_kebab: _.kebabCase(componentName),
            component_upper: _.upperFirst(componentName),
            component_camel: _.camelCase(componentName),
        };

        const jsPath = path.join('client/', `${namespace}.js`);
        const pugPath = path.join('client/', `${namespace}.pug`);
        this.fs.copyTpl(
            this.templatePath('Component.js.tpl'),
            this.destinationPath(jsPath), data);
        this.fs.copyTpl(
            this.templatePath('Component.pug.tpl'),
            this.destinationPath(pugPath), data);
    }
}
module.exports = Generator;
