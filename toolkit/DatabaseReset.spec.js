import BottleFactory from './BottleFactory';
import DatabaseReset from './DatabaseReset';

describe('DatabaseReset', () => {
    it('should reset the database', (done) => {
        const bottle = BottleFactory.create();
        const Manga = bottle.container.Manga;

        DatabaseReset.reset()
            .then(() => new Manga({}).save())
            .then(() => Manga.findOne({}))
            .then(() => foundManga => expect(foundManga).toBeTruthy())
            .then(() => DatabaseReset.reset())
            .then(() => Manga.findOne({}))
            .catch(fail)
            .then(done);
    });
});
