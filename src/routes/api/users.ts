import express from 'express';
import { UserHandler } from '../../handlers/user';
import verifyAuthToken from '../../middlewares/verifyAuthToken';

const userMethods = new UserHandler();

const users = express.Router();

users.get('/index', verifyAuthToken, userMethods.index);
users.get('/show/:id', verifyAuthToken, userMethods.show);
users.post('/create', userMethods.create);

export default users;