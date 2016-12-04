import fs from 'fs';
import rimraf from 'rimraf';

export default class TestStorage {
    init() {
        this.folder = fs.mkdtempSync(`${__dirname}/`);
    }
    getFolder() {
        if (!this.folder) {
            throw new Error('init not called yet');
        }
        return this.folder;
    }
    dispose() {
        rimraf.sync(this.getFolder());
        this.folder = null;
    }
}
