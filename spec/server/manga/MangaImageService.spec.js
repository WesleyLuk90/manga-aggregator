import { Manga, MangaHandle } from 'manga-api';
import path from 'path';
import fs from 'fs';
import superagent from 'superagent';

import BottleFactory from '../BottleFactory';
import TestStorage from '../../toolkit/TestStorage';
import ImageServer from '../../toolkit/ImageServer';

describe('MangaImageService', () => {
    let bottle;
    let imageServer;
    let testStorage;
    let imageService;
    let manga;
    let downloadPath;

    beforeEach((done) => {
        bottle = BottleFactory.create();

        testStorage = new TestStorage().init(bottle);
        imageServer = new ImageServer();
        const mangaResource = bottle.container.mangaResource;
        const handle = MangaHandle.fromUrl('mock://');
        imageService = bottle.container.mangaImageService;
        imageServer.start()
            .then(() => {
                const mangaData = new Manga(handle)
                    .setName('some manga')
                    .setPreviewImageUrl(imageServer.makeUrl('test.png'));
                return mangaResource
                    .create(mangaData)
                    .then((createdManga) => {
                        manga = createdManga;
                        downloadPath = `manga/${manga.name}-${manga._id}/preview-image.png`;
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

    it('should fetch images as a buffer and write them to disk', (done) => {
        imageService.getPreviewImage(manga)
            .then((data) => {
                expect(Buffer.isBuffer(data)).toBe(true);
                expect(data.equals(imageServer.getTestImageData())).toBe(true);
                const previewImagePath = path.join(testStorage.getFolder(), downloadPath);
                expect(fs.readFileSync(previewImagePath).toString('hex')).toBe(imageServer.getTestImageData().toString('hex'));
            })
            .then(() => {
                spyOn(superagent, 'get').and.throwError(new Error());
                return imageService.getPreviewImage(manga);
            })
            .then((data) => {
                expect(Buffer.isBuffer(data)).toBe(true);
                expect(data.equals(imageServer.getTestImageData())).toBe(true);
            })
            .catch(fail)
            .then(done);
    });

    it('should resolve to the same value if two requests are sent', (done) => {
        const promises = [
            imageService.getPreviewImage(manga),
            imageService.getPreviewImage(manga),
        ];
        expect(promises[0]).toBe(promises[1]);
        Promise
            .all(promises)
            .then((results) => {
                expect(results[0].equals(results[1])).toBe(true);
            })
            .catch(fail)
            .then(done);
    });
    describe('failure', () => {
        it('should fail on 404', (done) => {
            manga.previewImageUrl = imageServer.makeUrl('404 page');
            imageService.getPreviewImage(manga)
                .then(fail)
                .catch((e) => {
                    expect(e).toMatch(/Not Found/);
                    return imageService
                        .fileExists(downloadPath)
                        .then(exists => expect(exists).toBe(false));
                })
                .then(done);
        });

        it('should fail on non image', (done) => {
            manga.previewImageUrl = imageServer.makeUrl('/test-page');
            imageService.getPreviewImage(manga)
                .then(fail)
                .catch((e) => {
                    expect(e).toMatch(/Unexpected response type text\/html/);
                    return imageService
                        .fileExists(downloadPath)
                        .then(exists => expect(exists).toBe(false));
                })
                .then(done);
        });
    });
});
