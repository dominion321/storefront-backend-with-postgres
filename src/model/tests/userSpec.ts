import supertest from 'supertest';
import app from '../../server';
import { UserStore } from '../user';

const request = supertest(app);
const store = new UserStore();


