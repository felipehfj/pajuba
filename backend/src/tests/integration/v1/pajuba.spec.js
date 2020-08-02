const request = require('supertest');
const app = require('../../../app');
const connection = require('../../../database/connection');
const faker = require('faker/locale/pt_BR');

describe('Pajuba', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
        await connection.seed.run();
    });

    afterAll(async () => {
        await connection.destroy();
        app.close();
    });

    it('should be able to create a pajuba', async () => {
        const payload = {
            expression: faker.name.findName(),
            description: faker.lorem.paragraph(1),
            region: faker.address.city(),
            usage: faker.lorem.sentence(10),
        };       
        const response = await request(app)
            .post('/api/v1/pajubas')
            .send(payload)
            .expect(201)
            .expect((res) => { 
                 if (!('id' in res.body)) throw new Error("missing id");
            })
            ;            
    });

    it('should be able to get a pajuba', async () => {
        const response = await request(app)
            .get('/api/v1/pajubas/1')
            .send()
            .expect(200)
            .expect(res => { 
                if (!('id' in res.body)) throw new Error("missing id");
                if (!('expression' in res.body)) throw new Error("missing expression");
                if (!('description' in res.body)) throw new Error("missing description");
            });       
    });

    it('should be able to get a random pajuba', async () => {
        const response = await request(app)
            .get('/api/v1/pajubas/random')
            .send()
            .expect(200)
            .expect(res => { 
                if (!('id' in res.body)) throw new Error("missing id");
                if (!('expression' in res.body)) throw new Error("missing expression");
                if (!('description' in res.body)) throw new Error("missing description");
            });       
    });

    it('should be able to get a word of day from pajuba', async () => {
        const response = await request(app)
            .get('/api/v1/pajubas/wordOfDay')
            .send()
            .expect(200)
            .expect(res => { 
                if (!('id' in res.body)) throw new Error("missing id");
                if (!('expression' in res.body)) throw new Error("missing expression");
                if (!('description' in res.body)) throw new Error("missing description");
            });       
    });

    it('should be able to get an array of pajuba', async () => {
        const response = await request(app)
            .get('/api/v1/pajubas')
            .send()
            .expect(200)
            .expect(res =>{
                if(res.body.length === 0)  throw new Error("Invalid array");
            })            
    });

    it('should be able to delete an pajuba', async () => {
        const payload = {
            expression: faker.name.findName(),
            description: faker.lorem.paragraph(1),
            region: faker.address.city(),
            usage: faker.lorem.sentence(10),
        };  

        const response1 = await request(app)
            .post('/api/v1/pajubas')
            .send(payload);

        const id = response1.body.id;

        const response = await request(app)
            .delete(`/api/v1/pajubas/${id}`)
            .send()
            .expect(204);        
    });

    it('should be able to do a partial update on pajuba', async () => {
        const payload = {
            expression: faker.name.findName(),
            description: faker.lorem.paragraph(1),
            region: faker.address.city(),
            usage: faker.lorem.sentence(10),
        };  

        const response = await request(app)
            .patch('/api/v1/pajubas/1')
            .send(payload)
            .expect(204);        
    });

    it('should not be able to create a pajuba with duplicated name', async () => {
        const payload = {
            expression: faker.name.findName(),
            description: faker.lorem.paragraph(1),
            region: faker.address.city(),
            usage: faker.lorem.sentence(10),
        };  

        const response = await request(app)
            .post('/api/v1/pajubas')
            .send(payload);

        const response2 = await request(app)
            .post('/api/v1/pajubas')
            .send(payload)
            .expect(400)
            .expect(res => {
                if(!('error' in res.body)) throw new Error('Invalid');
                if(!(res.body.error.toLowerCase() !== 'Conflicted name')) throw new Error('Invalid');
            });        
    });

});