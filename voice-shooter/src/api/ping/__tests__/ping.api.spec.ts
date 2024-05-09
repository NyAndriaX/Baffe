import request from 'supertest';
import app from '../../../config/app';

describe('GET /api/ping', () => {
    it('should respond pong', async () => {
        const { text, status } = await request(app).get('/api/ping');

        expect(status).toEqual(200);
        expect(text).toEqual('pong');
    });
});
