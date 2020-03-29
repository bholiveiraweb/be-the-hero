const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connect');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('shoud be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "Anjo Animal",
                email: "contato@anjoanimal.com.br",
                whatsapp: "11999999999",
                city: "Jundiaí",
                uf: "SP"
            });

            expect(response.body).toHaveProperty('id');
            expect(response.body.id).toHaveLength(8);
    })
})