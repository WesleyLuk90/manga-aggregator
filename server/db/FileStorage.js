import mkdirp from 'mkdirp';
import path from 'path';

export default class FileStorage {
    constructor(configuration) {
        this.configuration = configuration;
    }

    getFolder(pathComponents) {
        if (!Array.isArray(pathComponents)) {
            throw new Error('Invalid path components');
        }
        const escapedComponents = pathComponents.map(this.escape);
        const folderPath = path.join(this.configuration.getStorageFolder(), ...escapedComponents);
        return new Promise((resolve, reject) => {
            mkdirp(folderPath, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(folderPath);
            });
        });
    }

    escape(pathToEscape) {
        return pathToEscape.replace(/[^a-zA-Z0-9_ \-.]/g, '') || '_';
    }
}

FileStorage.$name = 'fileStorage';
FileStorage.$inject = ['configuration'];
