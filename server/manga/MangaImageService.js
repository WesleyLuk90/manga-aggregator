import http from 'http';
import fs from 'fs';
import Q from 'q';

export default class MangaImageService {
    constructor(mangaPaths) {
        this.previewImagesProcessing = new Map();
        this.mangaPaths = mangaPaths;
    }

    getProcessing(manga) {
        return this.previewImagesProcessing.get(manga._id) || Promise.resolve();
    }

    getPreviewImage(manga) {
        if (!manga.previewImageUrl) {
            throw new Error('Manga does not have a preview image');
        }
        return new Promise((resolve) => {
            http.get(manga.previewImageUrl, (response) => {
                this.writePreviewImage(manga, response);
                resolve(response);
            });
        });
    }

    writePreviewImage(manga, response) {
        const promise = this.mangaPaths
            .getPreviewImagePath(manga)
            .then((previewImagePath) => {
                const writeStream = fs.createWriteStream(previewImagePath);
                const result = response.pipe(writeStream);
                const defer = Q.defer();
                result.on('finish', defer.resolve);
                result.on('error', defer.reject);
                return defer.promise
                    .then(() => {
                        this.previewImagesProcessing.delete(manga._id);
                    });
            })
            .catch((e) => {
                console.log(e);
            });
        this.previewImagesProcessing.set(manga._id, promise);
        return promise;
    }
}

MangaImageService.$name = 'mangaImageService';
MangaImageService.$inject = ['mangaPaths'];
