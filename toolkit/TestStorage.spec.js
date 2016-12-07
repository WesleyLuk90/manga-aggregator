import fs from 'fs';
import path from 'path';

import TestStorage from './TestStorage';
import BottleFactory from './BottleFactory';

describe('TestStorage', () => {
    let storage;
    let bottle;
    beforeEach(() => {
        storage = new TestStorage();
        bottle = BottleFactory.create();
    });

    it('should create and cleanup storage', () => {
        storage.init();
        const folder = storage.getFolder();
        storage.patch(bottle);
        expect(typeof folder).toBe('string');
        expect(fs.statSync(folder)).toBeTruthy();
        fs.writeFileSync(path.join(folder, 'temp.txt'));
        expect(bottle.container.configuration.getStorageFolder()).toBe(folder);
        storage.dispose();
        expect(() => fs.statSync(folder)).toThrowError(/no such file or directory/);
    });
});
