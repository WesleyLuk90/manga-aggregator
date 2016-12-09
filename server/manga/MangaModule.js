import MangaService from './MangaService';
import Manga from './Manga';
import MangaEvents from './MangaEvents';
import MangaRoutes from './MangaRoutes';
import MangaPaths from './MangaPaths';
import MangaImageService from './MangaImageService';
import MangaJobService from './MangaJobService';
import MangaResource from './MangaResource';

export default class MangaModule {
    static register(bottle) {
        bottle.register(MangaService);
        bottle.register(Manga);
        bottle.register(MangaEvents);
        bottle.register(MangaRoutes);
        bottle.register(MangaPaths);
        bottle.register(MangaImageService);
        bottle.register(MangaJobService);
        bottle.register(MangaResource);
    }
}
