const customMatchers = {
    toContainElement() {
        return {
            compare(actual, expected) {
                if (!actual || !actual.length) {
                    return {
                        pass: false,
                        message: 'Expected element to not be null',
                    };
                }
                if (!expected) {
                    return {
                        pass: false,
                        message: 'Expected dom selector to not be null',
                    };
                }
                const result = {};
                result.pass = actual.find(expected).length > 0;
                if (!result.pass) {
                    result.message = `Expected '${actual.html()}' to contain element '${expected}'`;
                } else {
                    result.message = `Expected '${actual.html()}' to not contain element '${expected}'`;
                }
                return result;
            },
        };
    },
    toBeVisible() {
        return {
            compare(actual) {
                const result = {};
                result.pass = (actual.length > 0) && !actual.hasClass('ng-hide');
                if (result.pass) {
                    result.message = `Expected '${actual.html()}' not to be visible`;
                } else {
                    result.message = `Expected '${actual.html()}' to be visible`;
                }
                return result;
            },
        };
    },
    toContainText() {
        return {
            compare(actual, expected) {
                if (!actual || !actual.length) {
                    return {
                        pass: false,
                        message: 'Expected element to not be null',
                    };
                }
                if (!expected) {
                    return {
                        pass: false,
                        message: 'Expected dom selector to not be null',
                    };
                }
                const result = {};
                result.pass = actual.text().indexOf(expected) > -1;
                if (result.pass) {
                    result.message = `Expected '${actual.text()}' not to contain text '${expected}'`;
                } else {
                    result.message = `Expected '${actual.text()}' to contain text '${expected}'`;
                }
                return result;
            },
        };
    },
    toStartWith() {
        return {
            compare(actual, expected) {
                if (actual == null) {
                    return {
                        pass: false,
                        message: 'Expected actual to not be null',
                    };
                }
                if (expected == null) {
                    return {
                        pass: false,
                        message: 'Expected expected to not be null',
                    };
                }
                const result = {};
                result.pass = actual.indexOf(expected) === 0;
                if (result.pass) {
                    result.message = `Expected ${actual} to not start with ${expected}`;
                } else {
                    result.message = `Expected ${actual} to start with ${expected}`;
                }
                return result;
            },
        };
    },
    toHaveClass() {
        return {
            compare(actual, expected) {
                if (!actual) {
                    return {
                        pass: false,
                        message: 'Expected element to not be null',
                    };
                }
                if (!expected) {
                    return {
                        pass: false,
                        message: 'Expected class to not be null',
                    };
                }
                const result = {};
                result.pass = actual.hasClass(expected);
                if (result.pass) {
                    result.message = `Expected '${actual.prop('class')}' not to have class '${expected}'`;
                } else {
                    result.message = `Expected '${actual.prop('class')}' to have class '${expected}'`;
                }
                return result;
            },
        };
    },
};

beforeEach(() => {
    jasmine.addMatchers(customMatchers);
});
