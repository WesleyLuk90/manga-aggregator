import BottleFactory from '../../toolkit/BottleFactory';
import DatabaseReset from '../../toolkit/DatabaseReset';

describe('DatabaseReset', () => {
    function testForModel(modelName) {
        it(`should reset the database for ${modelName}`, (done) => {
            const bottle = BottleFactory.create();
            const MyModel = bottle.container[modelName];

            new MyModel({}).save()
                .then(() => MyModel.findOne({}))
                .then(() => myModel => expect(myModel).toBeTruthy())
                .then(() => DatabaseReset.reset())
                .then(() => MyModel.findOne({}))
                .then(foundModel => expect(foundModel).toBe(null))
                .catch(fail)
                .then(done);
        });
    }

    testForModel('Manga');
    testForModel('Chapter');
});
