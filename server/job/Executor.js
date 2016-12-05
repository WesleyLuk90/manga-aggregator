import Job from './Job';

export default class Executor {
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

Executor.$name = 'executor';
Executor.$inject = [];
