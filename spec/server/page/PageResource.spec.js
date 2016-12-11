import { PageHandle, Page } from 'manga-api';
import BottleFactory from '../../../toolkit/BottleFactory';

describe('PageResource', () => {
    let pageResource;

    beforeEach(() => {
        const bottle = BottleFactory.create();
        pageResource = bottle.container.pageResource;
    });

    it('should upsert pages', (done) => {
        pageResource.upsert(new Page(PageHandle.fromUrl('mock://page')))
            .then((createdPage) => {
                expect(createdPage._id).toBeTruthy();
                return pageResource.getByHandle(createdPage.pageHandle)
                    .then(foundPage => expect(foundPage._id).toEqual(createdPage._id))
                    .then(() => pageResource.getById(createdPage._id))
                    .then(byIdPage => expect(byIdPage._id).toEqual(createdPage._id));
            })
            .catch(fail)
            .then(done);
    });
});
