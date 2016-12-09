import { ChapterHandle } from 'manga-api';

export default class ChapterService {
    constructor(repositoryList, chapterResource) {
        this.repositoryList = repositoryList;
        this.chapterResource = chapterResource;
    }
    loadChapter(chapterHandle) {
        const handle = this.toHandle(chapterHandle);
        const repository = this.repositoryList.getRepositoryForHandle(handle);

        return repository.getChapter(handle)
            .then(chapter => this.chapterResource.create(chapter));
    }

    toHandle(chapterHandle) {
        if (!(chapterHandle instanceof ChapterHandle) && chapterHandle.url) {
            return ChapterHandle.fromUrl(chapterHandle.url);
        }
        return chapterHandle;
    }
}

ChapterService.$name = 'chapterService';
ChapterService.$inject = ['repositoryList', 'chapterResource'];
