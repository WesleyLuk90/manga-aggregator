import fs from 'fs';
import path from 'path';

import TestStorage from './TestStorage';

fdescribe('TestStorage', () => {
    let storage;
    beforeEach(() => {
        storage = new TestStorage();
    });

    it('should create and cleanup storage', () => {
        storage.init();
        const folder = storage.getFolder();
        expect(typeof folder).toBe('string');
        expect(fs.statSync(folder)).toBeTruthy();
        fs.writeFileSync(path.join(folder, 'temp.txt'));
        storage.dispose();
        expect(() => fs.statSync(folder)).toThrowError(/no such file or directory/);
    });
});
