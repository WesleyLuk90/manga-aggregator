export default class ChapterEvents {
    constructor(socketService) {
        this.socketService = socketService;
    }

    emitChapter(chapter) {
        this.socketService.emit('chapter', chapter.toObject());
    }
}

ChapterEvents.$name = 'chapterEvents';
ChapterEvents.$inject = ['socketService'];
