import PageService from './PageService';
import Page from './Page';
import PageResource from './PageResource';

export default class PageModule {
    static register(bottle) {
        bottle.register(PageService);
        bottle.register(PageResource);
        bottle.register(Page);
    }
}
