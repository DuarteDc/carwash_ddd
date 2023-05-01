import request from 'supertest';

import { Container } from '../infrastructure/Container';

import { Server } from '../infrastructure/server/Server';

const container = new Container();
const server = container.invoke().resolve<Server>('server');
const config = container.invoke().resolve('config');

const app = server.startServer();

describe("POST /api/auth/login", () => {
    test('should respond with a 400 status code', async() => { 
        const response = await request(app).post('/api/auth/login').send();
        expect(response.statusCode).toBe(400)
     })

     test('should respond with a 400 status code', async() => { 
        const response = await request(app).post('/api/auth/login').send({
            email: 'DC@gmail.com',
            password: '123456'
        });
        expect(response.statusCode).toBe(400)
     })

     test('should respond with a json and a 200 status code', async() => { 
        const response = await request(app).post('/api/auth/login').send({
            email: 'DC@gmail.com',
            password: 'password'
        });
        expect(response.body.user);
     })
})