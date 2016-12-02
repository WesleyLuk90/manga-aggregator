import mangaApi from 'manga-api';

export default function createRepositoryList() {
    return mangaApi.RepositoryListFactory.create();
}

createRepositoryList.$name = 'repositoryList';
createRepositoryList.$type = 'factory';
