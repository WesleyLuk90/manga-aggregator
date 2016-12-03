import Module from '../../server/Module';

describe('Module', () => {
    it('should load dependencies', () => {
        const bottle = new Module().create();
        expect(bottle.container.server).toBeTruthy();
    });
});
