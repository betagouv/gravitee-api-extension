import { build } from '../src/app';

describe('Server smoke test', () => {
    test('server responds to /ping', async () => {
        const app = build();
        const response = await app.inject({
            method: 'GET',
            url: '/ping'
        })

        expect(response.statusCode).toBe(200)
        expect(response.payload).toBe('pong\n')
        app.close();
    })
})
