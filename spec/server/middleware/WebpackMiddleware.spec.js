import BottleFactory from '../BottleFactory';

describe('WebpackMiddleware', () => {
    let bottle;
    beforeEach(() => {
        bottle = BottleFactory.create();
    });

    it('should not build', () => {
        expect(bottle.container.configuration.liveWebpackBuild()).toBe(false);
    });
});
