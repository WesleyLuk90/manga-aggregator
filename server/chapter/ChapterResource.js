import { Types } from 'mongoose';

export default class ChapterResource {
    constructor(Chapter) {
        this.Chapter = Chapter;
    }

    create(chapter) {
        return new this.Chapter(chapter)
            .save();
    }

    getById(chapterId) {
        if (typeof chapterId !== 'string' && !(chapterId instanceof Types.ObjectId)) {
            throw new Error('Expected a string');
        }
        return this.Chapter.findOne({ _id: chapterId });
    }
}

ChapterResource.$name = 'chapterResource';
ChapterResource.$inject = ['Chapter'];
