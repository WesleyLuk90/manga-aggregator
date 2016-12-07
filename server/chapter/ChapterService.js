export default class ChapterService {
    constructor(repositoryList) {
        this.repositoryList = repositoryList;
    }
    load(chapterHandle) {
        const repository = this.repositoryList.getByHandle(chapterHandle);

        return repository.loadChapter(chapterHandle)
            .then(chapter => this.chapterResource.create(chapter));
    }
}

ChapterService.$name = 'chapterService';
ChapterService.$inject = ['repositoryList'];
