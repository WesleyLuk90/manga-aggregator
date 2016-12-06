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
        return Promise.resolve().then(() => job.run());
    }
    stop() {

    }
}

ExecutorService.$name = 'executorService';
ExecutorService.$inject = [];
