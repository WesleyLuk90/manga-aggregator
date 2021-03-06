import PageService from './PageService';
import Page from './Page';
import PageResource from './PageResource';
import PageEvents from './PageEvents';
import PageRoutes from './PageRoutes';

export default class PageModule {
    static register(bottle) {
        bottle.register(PageService);
        bottle.register(PageResource);
        bottle.register(PageEvents);
        bottle.register(Page);
        bottle.register(PageRoutes);
    }
}
