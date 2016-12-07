import fs from 'fs';
import Q from 'q';
import superagent from 'superagent';

export default class MangaImageService {
    constructor(mangaPaths) {
        this.previewImagesProcessing = new Map();
        this.mangaPaths = mangaPaths;
    }

    markAsProcessing(manga, promise) {
        return this.previewImagesProcessing.set(manga._id, promise);
    }

    getProcessing(manga) {
        return this.previewImagesProcessing.get(manga._id);
    }

    clearProcessing(manga) {
        this.previewImagesProcessing.delete(manga._id);
    }

    getPreviewImage(manga) {
        if (!manga.previewImageUrl) {
            throw new Error('Manga does not have a preview image');
        }
        if (this.getProcessing(manga)) {
            return this.getProcessing(manga);
        }
        const promise = this.getOrDownloadImage(manga);
        this.markAsProcessing(manga, promise);
        promise.then(() => this.clearProcessing(manga), () => this.clearProcessing(manga));
        return promise;
    }

    getOrDownloadImage(manga) {
        return this.mangaPaths
            .getPreviewImagePath(manga)
            .then(previewImagePath =>
                this.fileExists(previewImagePath)
                .then((exists) => {
                    if (exists) {
                        return this.readFile(previewImagePath);
                    } else {
                        return this.downloadAndWriteImage(manga, previewImagePath);
                    }
                }));
    }

    downloadAndWriteImage(manga, downloadPath) {
        return this.downloadImage(manga.previewImageUrl)
            .then(downloadedImage =>
                this.writeBuffer(downloadedImage, downloadPath)
                .then(() => downloadedImage));
    }

    downloadImage(url) {
        if (typeof url !== 'string') {
            throw new Error('Expected a string');
        }
        return superagent.get(url)
            .buffer()
            .then((response) => {
                if (!response.type.match('image/(png|jpeg|gif)')) {
                    throw new Error(`Unexpected response type ${response.type}`);
                }
                return response.body;
            });
    }

    fileExists(path) {
        return Q.ninvoke(fs, 'stat', path)
            .then(() => true, () => false);
    }

    writeBuffer(buffer, filePath) {
        return Q.ninvoke(fs, 'writeFile', filePath, buffer);
    }

    readFile(filePath) {
        return Q.ninvoke(fs, 'readFile', filePath);
    }
}

MangaImageService.$name = 'mangaImageService';
MangaImageService.$inject = ['mangaPaths'];
