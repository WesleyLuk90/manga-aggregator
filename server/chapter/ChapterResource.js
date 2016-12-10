import { Types } from 'mongoose';

export default class ChapterResource {
    constructor(Chapter) {
        this.Chapter = Chapter;
    }

    upsert(chapter) {
        return this.Chapter.findOneAndUpdate({ 'chapterHandle.url': chapter.chapterHandle.url }, chapter, { new: true, upsert: true });
    }

    getById(chapterId) {
        if (typeof chapterId !== 'string' && !(chapterId instanceof Types.ObjectId)) {
            throw new Error('Expected a string');
        }
        return this.Chapter.findOne({ _id: chapterId });
    }

    getByHandle(handle) {
        return this.Chapter.findOne({ 'chapterHandle.url': handle.url });
    }
}

ChapterResource.$name = 'chapterResource';
ChapterResource.$inject = ['Chapter'];
