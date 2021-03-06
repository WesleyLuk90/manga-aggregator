import ExecutorService from '../../../server/job/ExecutorService';
import Job from '../../../server/job/Job';

describe('ExecutorService', () => {
    let executor;

    class TestJob extends Job {
        run() {}
    }

    beforeEach(() => {
        executor = new ExecutorService();
    });

    it('should not accept jobs before start', () => {
        expect(() => executor.submit(new TestJob())).toThrowError(/Executor not started/);
    });

    it('should accept jobs after start', (done) => {
        executor.start();
        executor.submit(new TestJob())
            .then(() => {
                executor.stop();
            })
            .catch(fail)
            .then(done);
    });

    it('should not accept non jobs', () => {
        expect(() => executor.submit({})).toThrowError(/Expected a Job/);
    });

    it('should execute jobs', (done) => {
        const job = new TestJob();
        spyOn(job, 'run');
        executor.start();
        executor.submit(job)
            .then(() => {
                expect(job.run).toHaveBeenCalled();
            })
            .catch(fail)
            .then(done);
    });

    it('should log errors', (done) => {
        spyOn(console, 'error');
        const job = new TestJob();
        spyOn(job, 'run').and.returnValue(Promise.reject('hello'));
        executor.start();
        executor.submit(job)
            .then(fail)
            .catch(() => expect(console.error).toHaveBeenCalledWith('hello'))
            .then(done);
    });
});
