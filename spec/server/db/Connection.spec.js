import BottleFactory from '../BottleFactory';

describe('Connection', () => {
    it('should be using the test database', () => {
        const bottle = BottleFactory.create();
        expect(bottle.container.configuration.getConnectionString()).toMatch(/manga_aggregator_test$/);
    });
});
