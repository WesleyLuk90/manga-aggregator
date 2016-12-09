export default class ChapterService {
    constructor(repositoryList, chapterResource) {
        this.repositoryList = repositoryList;
        this.chapterResource = chapterResource;
    }
    loadChapter(chapterHandle) {
        const repository = this.repositoryList.getRepositoryForHandle(chapterHandle);

        return repository.getChapter(chapterHandle)
            .then(chapter => this.chapterResource.create(chapter));
    }
}

ChapterService.$name = 'chapterService';
ChapterService.$inject = ['repositoryList', 'chapterResource'];
