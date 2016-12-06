import BottleFactory from './BottleFactory';

describe('Module', () => {
    it('should load dependencies', () => {
        const bottle = BottleFactory.create();
        expect(bottle.container.server).toBeTruthy();
        expect(bottle.container.executorService).toBeTruthy();
    });
});
