import { Schema } from 'mongoose';

export default function createManga(connection) {
    return connection.model('Manga', {
        mangaHandle: new Schema({ url: { type: String, index: true } }),
        name: String,
        altNames: [String],
        releaseYear: String,
        authors: [String],
        artists: [String],
        genres: [String],
        summary: String,
        previewImageUrl: String,
        chapters: [new Schema({ url: { type: String, index: true } })],
    });
}


createManga.$name = 'Manga';
createManga.$inject = ['connection'];
