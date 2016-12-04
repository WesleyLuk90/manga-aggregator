import { Manga, MangaHandle } from 'manga-api';
import path from 'path';
import fs from 'fs';

import BottleFactory from '../BottleFactory';
import TestStorage from '../../toolkit/TestStorage';
import ImageServer from '../../toolkit/ImageServer';

fdescribe('MangaImageService', () => {
    let bottle;
    let imageServer;
    let testStorage;
    let manga;

    beforeEach((done) => {
        bottle = BottleFactory.create();

        testStorage = new TestStorage().init(bottle);
        imageServer = new ImageServer();
        const mangaResource = bottle.container.mangaResource;
        const handle = MangaHandle.fromUrl('mock://');
        imageServer.start()
            .then(() => {
                const mangaData = new Manga(handle)
                    .setName('some manga')
                    .setPreviewImageUrl(imageServer.makeUrl('test.png'));
                return mangaResource
                    .create(mangaData)
                    .then((createdManga) => {
                        manga = createdManga;
                    });
            })
            .catch(fail)
            .then(done);
    });
    afterEach((done) => {
        imageServer
            .stop()
            .catch(fail)
            .then(done);
    });

    function readStream(stream) {
        return new Promise((resolve, reject) => {
            const buffers = [];
            stream.on('data', (data) => {
                buffers.push(data);
            });

            stream.on('end', () => {
                const allData = Buffer.concat(buffers);
                resolve(allData);
            });

            stream.on('error', reject);
        });
    }

    it('should fetch images as a stream and write them to disk', (done) => {
        const imageService = bottle.container.mangaImageService;

        imageService.getPreviewImage(manga)
            .then((response) => {
                expect(response.pipe).toBeTruthy();
                return readStream(response);
            })
            .then((data) => {
                expect(data.equals(imageServer.getTestImageData())).toBe(true);
                return imageService.getProcessing(manga);
            })
            .then(() => {
                const previewImagePath = path.join(testStorage.getFolder(), `manga/${manga.name}-${manga._id}/preview-image.png`);
                expect(fs.readFileSync(previewImagePath).equals(imageServer.getTestImageData())).toBe(true);
            })
            .catch(fail)
            .then(done);
    });
});
