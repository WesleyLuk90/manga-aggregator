import { Manga, MangaHandle } from 'manga-api';

import BottleFactory from '../BottleFactory';
import TestStorage from '../../toolkit/TestStorage';
import ImageServer from '../../toolkit/ImageServer';

describe('MangaImageSpec', () => {
    let bottle;
    let imageServer;

    beforeEach(() => {
        bottle = BottleFactory.create();

        new TestStorage().init(bottle);
        imageServer = new ImageServer();
        imageServer.start();
    });
    afterEach(() => {
        imageServer.stop();
    });

    it('should fetch images as a stream', () => {
        const handle = MangaHandle.fromUrl('some url');
        const manga = new Manga(handle).setPreviewImageUrl(imageServer.makeUrl('test.png'));

        const stream = bottle.container.imageService.getImage(manga);

        expect(stream).toBeTruthy();
    });
});
