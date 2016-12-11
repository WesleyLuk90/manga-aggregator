import PageService from './PageService';

export default class PageModule {
    static register(bottle) {
        bottle.register(PageService);
    }
}
