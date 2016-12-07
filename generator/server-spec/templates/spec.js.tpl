import BottleFactory from '<%= bottle_factory_path %>';

describe('<%= component_upper %>', () => {
    let <%= component_camel %>;

    beforeEach(() => {
        const bottle = BottleFactory.create();
        <%= component_camel %> = bottle.container.<%= component_camel %>;
    });

    it('should check some value', () => {
        expect(<%= component_camel %>).toBe(true);
    });
});
