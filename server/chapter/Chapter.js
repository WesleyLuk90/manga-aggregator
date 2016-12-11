import { Schema } from 'mongoose';

export default function createChapter(connection) {
    return connection.model('Chapter', {
        chapterHandle: new Schema({ url: { type: String, index: true } }),
        title: String,
        volume: String,
        chapter: String,
        pages: [new Schema({ url: { type: String, index: true } })],
    });
}


createChapter.$name = 'Chapter';
createChapter.$inject = ['connection'];
