import fs from 'fs';
import rimraf from 'rimraf';
import mkdirp from 'mkdirp';
import path from 'path';

export default class TestStorage {
    init(bottle) {
        const tempFolder = path.join(__dirname, '../temp');
        mkdirp.sync(tempFolder);
        this.folder = fs.mkdtempSync(`${tempFolder}/temp_`);
        afterEach(() => this.dispose());
        process.on('exit', () => this.dispose());
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
        if (this.folder && !this.cleanupDisabled) {
            rimraf.sync(this.getFolder());
            this.folder = null;
        }
    }

    disableCleanup(disabled) {
        this.cleanupDisabled = disabled;
        return this;
    }

    patch(bottle) {
        bottle.container.configuration.getStorageFolder = () => this.folder;
    }
}
