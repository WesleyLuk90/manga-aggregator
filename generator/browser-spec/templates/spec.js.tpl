describe('<%= component_camel %>', () => {
    let <%= component_camel %>;

    beforeEach(inject((_<%= component_camel %>_) => { <%= component_camel %> = _<%= component_camel %>_; }));

    it('should check some value', () => {
        expect(<%= component_camel %>).toBe(true);
    });
});
