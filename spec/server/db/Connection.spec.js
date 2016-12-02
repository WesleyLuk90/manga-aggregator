import Module from '../../../server/Module';

describe('Connection', () => {
    it('should be using the test database', () => {
        const bottle = new Module().create();
        expect(bottle.container.connectionConfig.getConnectionString()).toMatch(/manga_aggregator_test$/);
    });
});
