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

        const jsPath = path.join('spec/server/', `${namespace}.spec.js`);
        const bottlePath = path.join('spec/server/BottleFactory.js');

        const data = {
            component_kebab: _.kebabCase(componentName),
            component_upper: _.upperFirst(componentName),
            component_camel: _.camelCase(componentName),
            bottle_factory_path: generatorUtils.relativePathTo(jsPath, bottlePath),
        };

        this.fs.copyTpl(
            this.templatePath('spec.js.tpl'),
            this.destinationPath(jsPath), data);
    }
}
module.exports = Generator;
