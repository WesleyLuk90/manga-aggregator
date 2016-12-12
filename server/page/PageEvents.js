export default class PageEvents {
    constructor(socketService) {
        this.socketService = socketService;
    }

    emitPage(page) {
        if (!page) {
            throw new Error('Expecting a page');
        }
        this.socketService.emit('page', page.toObject());
    }

}

PageEvents.$name = 'pageEvents';
PageEvents.$inject = ['socketService'];
