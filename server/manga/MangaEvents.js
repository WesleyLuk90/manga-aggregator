export default class MangaEvents {

    constructor(socketService) {
        this.socketService = socketService;
    }

    emitManga(manga) {
        this.socketService.emit('manga', manga.toObject());
    }
}

MangaEvents.$name = 'mangaEvents';
MangaEvents.$inject = ['socketService'];
