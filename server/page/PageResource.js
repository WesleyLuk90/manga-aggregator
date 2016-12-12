import { Types } from 'mongoose';

export default class PageResource {
    constructor(Page) {
        this.Page = Page;
    }

    upsert(page) {
        return this.Page.findOneAndUpdate({ 'pageHandle.url': page.pageHandle.url }, page, { new: true, upsert: true });
    }

    getByHandle(pageHandle) {
        if (typeof pageHandle.url !== 'string') {
            throw new Error('Expected a page handle');
        }
        return this.Page.findOne({ 'pageHandle.url': pageHandle.url });
    }

    getById(pageId) {
        if (typeof pageId !== 'string' && !(pageId instanceof Types.ObjectId)) {
            throw new Error('Expected a string');
        }
        return this.Page.findOne({ _id: pageId });
    }
}

PageResource.$name = 'pageResource';
PageResource.$inject = ['Page'];
