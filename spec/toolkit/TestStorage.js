import fs from 'fs';
import rimraf from 'rimraf';

export default class TestStorage {
    init(bottle) {
        this.folder = fs.mkdtempSync(`${__dirname}/temp_`);
        afterEach(() => this.dispose());
        if (bottle) {
            this.patch(bottle);
        }
        return this;
    }

    getFolder() {
        if (!this.folder) {
            throw new Error('init not called yet');
        }
        return this.folder;
    }

    dispose() {
        if (this.folder) {
            rimraf.sync(this.getFolder());
            this.folder = null;
        }
    }

    patch(bottle) {
        bottle.container.configuration.getStorageFolder = () => this.folder;
    }
}
