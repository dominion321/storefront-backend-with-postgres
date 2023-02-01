import supertest from 'supertest';
import app from '../../server';
import { User, UserStore } from '../user';

const request = supertest(app);
const store = new UserStore();

const newUser: User = {
  firstname: 'test',
  lastname: 'user',
  password: 'password',
};


describe('User Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have an create method', () => {
    expect(store.create(newUser)).toBeDefined();
  });
});

describe('User Endpoint', () => {
  it('should have an index method by endpoint', async () => {
    const response = await request.post('/api/users').send(newUser)
    expect(response.status).toBe(201);
  });

  it('should have an error when getting index by endpoint', async () => {
    const response = await request.get('/api/users')
    expect(response.status).toBe(401);
  });

  it('should have an error when getting a specific user by endpoint', async () => {
    const response = await request.get('/api/users/1')
    expect(response.status).toBe(401);
  });
});
