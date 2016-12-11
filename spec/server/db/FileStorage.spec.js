import fs from 'fs';
import BottleFactory from '../../../toolkit/BottleFactory';
import TestStorage from '../../../toolkit/TestStorage';

describe('FileStorage', () => {
    let fileStorage;

    beforeEach(() => {
        const bottle = BottleFactory.create();
        new TestStorage().init(bottle);

        fileStorage = bottle.container.fileStorage;
    });

    it('should create folders', (done) => {
        fileStorage.getFolder(['hello', 'world'])
            .then((storageFolder) => {
                expect(fs.statSync(storageFolder)).toBeTruthy();
            })
            .catch(fail)
            .then(done);
    });

    it('should escape paths', () => {
        expect(fileStorage.escape('hello_world_123')).toBe('hello_world_123');
        expect(fileStorage.escape('hel@lo_wor#ld$%_12!@#3!@#')).toBe('hello_world_123');
        expect(fileStorage.escape('!@*$&^!@*&')).toBe('_');
        expect(fileStorage.escape('abc.123.asdf')).toBe('abc.123.asdf');
    });
});
