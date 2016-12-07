export default class ChapterResource {
    constructor(Chapter) {
        this.Chapter = Chapter;
    }

    create(chapter) {
        return new this.Chapter(chapter)
            .save();
    }
}

ChapterResource.$name = 'chapterResource';
ChapterResource.$inject = ['Chapter'];
