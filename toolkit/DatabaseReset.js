import BottleFactory from './BottleFactory';

export default class DatabaseReset {
    static reset() {
        const container = BottleFactory.create().container;

        return Promise.resolve()
            .then(() => container.Manga.remove({}))
            .then(() => container.Chapter.remove({}));
    }
}
