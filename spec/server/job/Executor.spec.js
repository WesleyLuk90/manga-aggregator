import Executor from '../../../server/job/Executor';
import Job from '../../../server/job/Job';

describe('Executor', () => {
    let executor;

    class TestJob extends Job {
        run() {}
    }

    beforeEach(() => {
        executor = new Executor();
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
});
