import Job from './Job';

export default class ExecutorService {
    start() {
        this.started = true;
    }

    submit(job) {
        if (!(job instanceof Job)) {
            throw new Error('Expected a Job');
        }
        if (!this.started) {
            throw new Error('Executor not started');
        }
        const promise = Promise.resolve().then(() => job.run());
        promise.catch((e) => this.handleError(e));
        return promise;
    }

    handleError(e) {
        console.error(e);
    }

    stop() {

    }
}

ExecutorService.$name = 'executorService';
ExecutorService.$inject = [];
