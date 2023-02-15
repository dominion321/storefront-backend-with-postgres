import supertest from 'supertest';
import app from '../../server';
import { User, UserStore } from '../user';

//Initializing supertest module and user model respectively
const request = supertest(app);
const store = new UserStore();

//New User Object
const newUser: User = {
  firstname: 'test',
  lastname: 'user',
  password: 'password',
};

//Initialized user id variable
let userId: string;

describe('User Model', () => {
  it('should have an create method', async () => {
    const user = await store.create(newUser);
    const { id } = user;
    userId = id as string;
    expect(user.id).toBe(userId);
  });

  it('should have an index method', async() => {
    const index = await store.index();
    expect(index.length).toBeGreaterThan(0);
  });

  it('should have a show method', async() => {
    const show = await store.show(userId);
    expect(show.id).toBe(userId);
  });
});

describe('User Endpoint', () => {
  it('should have an create method by endpoint', async () => {
    const response = await request.post('/api/users').send(newUser);
    expect(response.status).toBe(201);
  });

  it('should deny access when getting index by endpoint', async () => {
    const response = await request.get('/api/users');
    expect(response.status).toBe(401);
  });

  it('should deny access when getting a specific user by endpoint', async () => {
    const response = await request.get('/api/users/1');
    expect(response.status).toBe(401);
  });
});
