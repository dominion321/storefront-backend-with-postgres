import express from 'express';
import { UserHandler } from '../../handlers/user';
import verifyAuthToken from '../../middlewares/verifyAuthToken';

const userMethods = new UserHandler();

const users = express.Router();

users.get('/', verifyAuthToken, userMethods.index);
users.get('/:id', verifyAuthToken, userMethods.show);
users.post('/', userMethods.create);

export default users;
