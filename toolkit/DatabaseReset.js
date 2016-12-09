import BottleFactory from './BottleFactory';

export default class DatabaseReset {
    static reset() {
        const bottle = BottleFactory.create();

        return bottle.container.Manga.remove({});
    }
}
