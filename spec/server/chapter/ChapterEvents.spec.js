import BottleFactory from '../../../toolkit/BottleFactory';

describe('ChapterEvents', () => {
    let chapterEvents;
    let socketService;
    let Chapter;

    beforeEach(() => {
        const bottle = BottleFactory.create();
        chapterEvents = bottle.container.chapterEvents;
        socketService = bottle.container.socketService;
        Chapter = bottle.container.Chapter;
    });

    it('should emit chapters', () => {
        spyOn(socketService, 'emit');
        const myChapter = new Chapter();
        chapterEvents.emitChapter(myChapter);
        expect(socketService.emit).toHaveBeenCalledWith('chapter', myChapter.toObject());
    });
});
