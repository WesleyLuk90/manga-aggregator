import superagent from 'superagent';
import ImageServer from './ImageServer';

fdescribe('ImageServer', () => {
    let server;
    beforeEach((done) => {
        server = new ImageServer();
        server.start()
            .catch(fail)
            .then(done);
    });

    it('should get an image', (done) => {
        superagent.get(server.makeUrl('/test.png'))
            .buffer()
            .then((res) => {
                expect(res.type).toBe('image/png');
                expect(Buffer.isBuffer(res.body)).toBe(true);
            })
            .catch(fail)
            .then(done);
    });

    it('should get a page', (done) => {
        superagent.get(server.makeUrl('/test-page'))
            .buffer()
            .then((res) => {
                expect(res.type).toBe('text/html');
            })
            .catch(fail)
            .then(done);
    });

    it('should get a 404', (done) => {
        superagent.get(server.makeUrl('/404page'))
            .buffer()
            .then(fail)
            .catch((res) => {
                expect(res.status).toBe(404);
            })
            .then(done);
    });

    afterEach((done) => {
        server.stop(done)
            .catch(fail)
            .then(done);
    });
});
