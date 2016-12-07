import BottleFactory from '../../../toolkit/BottleFactory';

describe('WebpackMiddleware', () => {
    let bottle;
    beforeEach(() => {
        bottle = BottleFactory.create();
    });

    it('should not build', () => {
        expect(bottle.container.configuration.liveWebpackBuild()).toBe(false);
    });
});
