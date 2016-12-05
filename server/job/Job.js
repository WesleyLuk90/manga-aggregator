export default class Job {
    constructor() {
        this.interrupted = false;
    }
    run() {
        throw new Error('Not Implemented');
    }

    interrupt() {
        this.interrupted = true;
    }

    isInterrupted() {
        return this.interrupted;
    }
}
