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
