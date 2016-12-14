import angular from 'angular';
import rx from 'rx';

class PageNavigationService {
    constructor($stateParams, $document, $state) {
        'ngInject';

        this.$stateParams = $stateParams;
        this.$state = $state;
        this.setupHotkeys($document[0]);
    }

    setupHotkeys(element) {
        this.keyStream = rx.Observable.fromEvent(element, 'keydown')
            .filter(() => this.enabled);
        this.keyStream.subscribe(e => console.log(e.key));
        this.keyStream.filter(e => e.key === 'ArrowLeft').subscribe(() => this.previous());
        this.keyStream.filter(e => e.key === 'ArrowRight').subscribe(() => this.next());
    }

    getChapterId() {
        return this.$stateParams.chapterId;
    }

    getCurrentPageNumber() {
        return this.getCurrentPageIndex() + 1;
    }

    getCurrentPageIndex() {
        if (this.$stateParams.pageNumber) {
            return this.$stateParams.pageNumber - 1;
        }
        return 0;
    }

    enableHotkeys() {
        this.enabled = true;
    }

    disableHotkeys() {
        this.enabled = false;
    }

    next() {
        this.$state.go('read-chapter', { chapterId: this.getChapterId(), pageNumber: this.getCurrentPageNumber() + 1 });
    }

    previous() {
        this.$state.go('read-chapter', { chapterId: this.getChapterId(), pageNumber: this.getCurrentPageNumber() - 1 });
    }
}

export default angular.module('mangaApp.pageNavigationService', [])
    .service('pageNavigationService', PageNavigationService)
    .name;
