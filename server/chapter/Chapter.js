import { Schema } from 'mongoose';

export default function createChapter(connection) {
    return connection.model('Chapter', {
        chapterHandle: new Schema({ url: String }),
        title: String,
        volume: String,
        chapter: String,
        pages: [new Schema({ url: String })],
    });
}


createChapter.$name = 'Chapter';
createChapter.$inject = ['connection'];
