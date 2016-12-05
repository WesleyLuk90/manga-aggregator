import Job from '../../../server/job/Job';

describe('Job', () => {
    it('should require extending', () => {
        expect(() => new Job().run()).toThrowError(/Not Implemented/);
    });

    it('should be runnable', () => {
        let ran = false;
        class MyJob extends Job {
            run() {
                ran = true;
            }
        }
        new MyJob().run();
        expect(ran).toBe(true);
    });

    it('should be interruptable', () => {
        class MyJob extends Job {}

        const job = new MyJob();
        expect(job.isInterrupted()).toBe(false);
        job.interrupt();
        expect(job.isInterrupted()).toBe(true);
    });
});
